from django.db import IntegrityError
from django.test import TestCase
from api.models import Track, Playlist, PlaylistTrack


class PlaylistModelTestCase(TestCase):
    def setUp(self):
        self.track1 = Track.objects.create(id="track_1", title="Track 1")
        self.track2 = Track.objects.create(id="track_2", title="Track 2")

    def test_create_playlist(self):
        playlist = Playlist.objects.create(title="My Playlist")
        self.assertEqual(playlist.title, "My Playlist")

    def test_add_tracks_to_playlist(self):
        playlist = Playlist.objects.create(title="My Playlist")
        PlaylistTrack.objects.create(playlist=playlist, track=self.track1, order=1)
        PlaylistTrack.objects.create(playlist=playlist, track=self.track2, order=2)
        self.assertEqual(playlist.tracks.count(), 2)

    def test_playlist_ordering(self):
        playlist = Playlist.objects.create(title="Ordered Playlist")
        PlaylistTrack.objects.create(track=self.track1, playlist=playlist, order=2)
        PlaylistTrack.objects.create(track=self.track2, playlist=playlist, order=1)

        latest_track = playlist.playlisttrack_set.latest()
        self.assertEqual(latest_track.track, self.track1)


class PlaylistTrackModelTestCase(TestCase):
    def setUp(self):
        self.track1 = Track.objects.create(id="track_1", title="Track 1")
        self.track2 = Track.objects.create(id="track_2", title="Track 2")
        self.playlist = Playlist.objects.create(title="My Playlist")

    def test_create_playlist_track(self):
        playlist_track = PlaylistTrack.objects.create(
            track=self.track1,
            playlist=self.playlist,
            order=1,
        )
        self.assertEqual(playlist_track.track, self.track1)
        self.assertEqual(playlist_track.playlist, self.playlist)

    def test_unique_together_constraint(self):
        PlaylistTrack.objects.create(track=self.track1, playlist=self.playlist, order=1)
        with self.assertRaises(IntegrityError):
            PlaylistTrack.objects.create(
                track=self.track1,
                playlist=self.playlist,
                order=1,
            )

    def test_get_latest_by_order(self):
        playlist_track1 = PlaylistTrack.objects.create(
            track=self.track1,
            playlist=self.playlist,
            order=2,
        )
        playlist_track2 = PlaylistTrack.objects.create(
            track=self.track2,
            playlist=self.playlist,
            order=1,
        )

        latest_track = PlaylistTrack.objects.latest("order")
        self.assertEqual(latest_track, playlist_track1)
