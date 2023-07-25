from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Playlist, Track

from playlist.serializers import PlaylistSerializer

PLAYLISTS_URL = reverse("playlist:playlist-list")


class PublicPlaylistApiTests(TestCase):
    """Test the publicly available playlist API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_not_required(self):
        """Test that login is required for retrieving playlists"""
        res = self.client.get(PLAYLISTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_playlists(self):
        """Test retrieving playlists"""

        Playlist.objects.create(title="Test Playlist 1")
        Playlist.objects.create(title="Test Playlist 2")

        res = self.client.get(PLAYLISTS_URL)

        playlists = Playlist.objects.all()
        serializer = PlaylistSerializer(playlists, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["result"]), len(serializer.data))

    def test_get_playlists_with_filter(self):
        """Test retrieving playlists with filter"""

        Playlist.objects.create(title="Test Playlist 1")
        Playlist.objects.create(title="Test Playlist 2")

        res = self.client.get(PLAYLISTS_URL, {"filter": '{"title": "Test Playlist 1"}'})

        playlists = Playlist.objects.filter(title="Test Playlist 1")
        serializer = PlaylistSerializer(playlists, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data[0]["title"], res.data["result"][0]["title"])

    def test_get_playlist_by_id(self):
        """Test retrieving a playlist by id"""

        playlist = Playlist.objects.create(title="Test Playlist 1")

        res = self.client.get(reverse("playlist:playlist-detail", args=[playlist.id]))

        serializer = PlaylistSerializer(playlist)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data["title"], res.data["result"]["title"])

    def test_get_playlist_by_id_not_found(self):
        """Test retrieving a playlist by id not found"""

        res = self.client.get(reverse("playlist:playlist-detail", args=["123"]))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_playlist(self):
        """Test creating a playlist"""
        tracks = Track.objects.all().first()
        payload = {"title": "Test Playlist 1", "track_ids": [tracks.id]}

        res = self.client.post(PLAYLISTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        playlist = Playlist.objects.get(id=res.data["result"]["id"])
        self.assertEqual(payload["title"], playlist.title)

    def test_create_playlist_with_invalid_payload(self):
        """Test creating a playlist with invalid payload"""
        payload = {"title": ""}

        res = self.client.post(PLAYLISTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_playlist(self):
        """Test updating a playlist"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        payload = {"title": "Test Playlist 2"}

        res = self.client.patch(
            reverse("playlist:playlist-detail", args=[playlist.id]), payload
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        playlist.refresh_from_db()
        self.assertEqual(payload["title"], playlist.title)

    def test_update_playlist_with_invalid_payload(self):
        """Test updating a playlist with invalid payload"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        payload = {"title": ""}

        res = self.client.patch(
            reverse("playlist:playlist-detail", args=[playlist.id]), payload
        )

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_playlist(self):
        """Test deleting a playlist"""
        playlist = Playlist.objects.create(title="Test Playlist 1")

        res = self.client.delete(
            reverse("playlist:playlist-detail", args=[playlist.id])
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        playlist = Playlist.objects.all()
        self.assertEqual(len(playlist), 0)

    def test_delete_playlist_not_found(self):
        """Test deleting a playlist not found"""

        res = self.client.delete(reverse("playlist:playlist-detail", args=["123"]))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_track_to_playlist(self):
        """Test adding a track to a playlist"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        track = Track.objects.all().first()
        payload = {"track_id": track.id}

        res = self.client.post(
            reverse("playlist:playlist-add-track", args=[playlist.id]), payload
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        playlist.refresh_from_db()
        self.assertEqual(len(playlist.track_ids.all()), 1)

    def test_add_track_to_playlist_with_invalid_payload(self):
        """Test adding a track to a playlist with invalid payload"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        payload = {"track_id": ""}

        res = self.client.post(
            reverse("playlist:playlist-add-track", args=[playlist.id]), payload
        )

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_track_to_playlist_not_found(self):
        """Test adding a track to a playlist not found"""
        payload = {"track_id": "123"}

        res = self.client.post(
            reverse("playlist:playlist-add-track", args=["123"]), payload
        )

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_track_to_playlist_track_not_found(self):
        """Test adding a track to a playlist track not found"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        payload = {"track_id": "123"}

        res = self.client.post(
            reverse("playlist:playlist-add-track", args=[playlist.id]), payload
        )

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_remove_track_from_playlist(self):
        """Test removing a track from a playlist"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        track = Track.objects.all().first()
        playlist.track_ids.add(track.id)

        payload = {"track_id": track.id}

        res = self.client.delete(
            reverse("playlist:playlist-remove-track", args=[playlist.id, track.id]),
            payload,
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        playlist.refresh_from_db()
        self.assertEqual(len(playlist.track_ids.all()), 0)

    def test_remove_track_from_playlist_not_found(self):
        """Test removing a track from a playlist not found"""

        res = self.client.delete(
            reverse("playlist:playlist-remove-track", args=["123", "123"])
        )

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_remove_track_from_playlist_track_not_found(self):
        """Test removing a track from a playlist track not found"""
        playlist = Playlist.objects.create(title="Test Playlist 1")

        res = self.client.delete(
            reverse("playlist:playlist-remove-track", args=[playlist.id, "123"])
        )

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_remove_track_from_playlist_track_not_in_playlist(self):
        """Test removing a track from a playlist track not in playlist"""
        playlist = Playlist.objects.create(title="Test Playlist 1")
        track = Track.objects.all().first()

        res = self.client.delete(
            reverse("playlist:playlist-remove-track", args=[playlist.id, track.id]),
        )

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
