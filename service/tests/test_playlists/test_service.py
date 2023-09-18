from django.http import Http404
from django.test import TestCase

from api.models import Track, PlaylistTrack, Playlist
from api.services import playlists as service


class PlaylistServiceTestCase(TestCase):
    def setUp(self):
        self.playlist = Playlist.objects.create(title="Test Playlist")
        self.track1 = Track.objects.create(id="track_1", title="Track 1")
        self.track2 = Track.objects.create(id="track_2", title="Track 2")

    def test_get_playlist_tracks(self):
        playlist_track1 = PlaylistTrack.objects.create(
            track=self.track1,
            playlist=self.playlist,
            order=1,
        )
        playlist_track2 = PlaylistTrack.objects.create(
            track=self.track2,
            playlist=self.playlist,
            order=2,
        )

        tracks = service.get_playlist_tracks(self.playlist)
        self.assertEqual(list(tracks), [self.track1, self.track2])

    def test_add_track_to_playlist(self):
        tracks_data = [{"track_id": self.track1.id}, {"track_id": self.track2.id}]
        added_tracks, errors = service.add_track_to_playlist(self.playlist, tracks_data)

        self.assertEqual(list(added_tracks), [self.track1, self.track2])

    def test_delete_track_from_playlist(self):
        playlist_track = PlaylistTrack.objects.create(
            track=self.track1,
            playlist=self.playlist,
            order=1,
        )

        result = service.delete_track_from_playlist(self.playlist.id, self.track1.id)
        self.assertTrue(result)

        with self.assertRaises(PlaylistTrack.DoesNotExist):
            PlaylistTrack.objects.get(
                playlist_id=self.playlist.id,
                track_id=self.track1.id,
            )

    def test_delete_track_not_in_playlist(self):
        with self.assertRaises(Http404):
            service.delete_track_from_playlist(self.playlist.id, self.track1.id)
