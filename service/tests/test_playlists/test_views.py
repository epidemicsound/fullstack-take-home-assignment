from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from api.models import Playlist, Track, PlaylistTrack


class PlaylistViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.playlist = Playlist.objects.create(title="Test Playlist")
        self.track1 = Track.objects.create(id="track_1", title="Track 1")
        self.track2 = Track.objects.create(id="track_2", title="Track 2")

        self.playlist_track1 = PlaylistTrack.objects.create(
            track=self.track1,
            playlist=self.playlist,
            order=1,
        )

    def test_list_playlists(self):
        url = reverse("playlist-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_playlist(self):
        url = reverse("playlist-detail", args=[self.playlist.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_playlist_not_found(self):
        url = reverse("playlist-detail", args=["random"])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_playlist(self):
        data = {"title": "New Playlist"}
        url = reverse("playlist-list")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Playlist.objects.count(), 2)

    def test_update_playlist(self):
        data = {"title": "Updated Playlist"}
        url = reverse("playlist-detail", args=[self.playlist.id])
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.playlist.refresh_from_db()
        self.assertEqual(self.playlist.title, "Updated Playlist")

    def test_update_playlist_not_found(self):
        data = {"title": "Updated Playlist"}
        url = reverse("playlist-detail", args=["random"])
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_playlist_tracks(self):
        url = reverse("playlist-playlist-tracks", args=[self.playlist.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertEqual(len(data), 1)

        track = data[0]
        self.assertEqual(track["id"], self.playlist_track1.track_id)

    def test_list_playlist_tracks_not_found(self):
        url = reverse("playlist-playlist-tracks", args=["random"])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_track_to_playlist(self):
        data = [{"track_id": self.track2.id}]
        url = reverse("playlist-playlist-tracks", args=[self.playlist.id])
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(PlaylistTrack.objects.count(), 2)

    def test_add_track_to_playlist_not_found(self):
        data = [{"track_id": self.track2.id}]
        url = reverse("playlist-playlist-tracks", args=["random"])
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_track_from_playlist(self):
        url = reverse(
            "playlist-delete-track",
            args=[self.playlist.id, self.playlist_track1.track.id],
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(PlaylistTrack.objects.count(), 0)

    def test_delete_track_from_playlist_not_found(self):
        url = reverse(
            "playlist-delete-track",
            args=[self.playlist.id, "random"],
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        url = reverse(
            "playlist-delete-track",
            args=[42, self.playlist_track1.track.id],
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
