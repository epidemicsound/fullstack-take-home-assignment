from django.test import TestCase
import json
import os

from . import serializers
from . import models

class PlaylistSerializerTest(TestCase):
    @classmethod
    def setUpClass(cls):
        resources_dir = os.path.join(os.path.dirname(__file__), "test-resources")
        data_file = os.path.join(resources_dir, "tracks.json")
        # Add a few tracks since we validate if tracks exist
        with open(data_file, "r") as file:
            tracks_data = json.load(file)
        for track in tracks_data:
            cls._create_track(track)
    
    @classmethod
    def tearDownClass(cls):
        models.Track.objects.all().delete()

    def test_empty_playlist_is_valid(self):
        # Arrange

        # these track_ids are valid.
        # check all loaded tracks in test-resources/tracks.json
        valid_playlist_data = {
            "title": "empty playlist",
            "tracks": []
        }

        # Act
        serializer = serializers.PlaylistSerializer(data=valid_playlist_data)
        valid = serializer.is_valid()

        # Assert
        self.assertTrue(valid)\

    def test_validate_correct_order_and_tracks(self):
        # Arrange

        # these track_ids are valid.
        # check all loaded tracks in test-resources/tracks.json
        valid_playlist_data = {
            "title": "valid title",
            "tracks": [{
                "order": 0,
                "track": { "id": "FKYVlOXV8Q" }
            },
            {
                "order": 1,
                "track": { "id": "QnBAVToyin" }
            }]
        }

        # Act
        serializer = serializers.PlaylistSerializer(data=valid_playlist_data)
        valid = serializer.is_valid()

        # Assert
        self.assertTrue(valid)

    def test_multiple_tracks_with_same_order_is_invalid(self):
        # Arrange
        invalid_playlist = {
            "title": "valid title",
            "tracks": [{
                "order": 0,
                "track": { "id": "FKYVlOXV8Q" }
            },
            {
                "order": 0,
                "track": { "id": "QnBAVToyin" }
            }]
        }

        # Act
        serializer = serializers.PlaylistSerializer(data=invalid_playlist)
        valid = serializer.is_valid()

        # Assert
        self.assertFalse(valid)

    def test_track_order_cannot_be_negative(self):
        # Arrange
        invalid_playlist_data = {
            "title": "valid title",
            "tracks": [{
                "order": -5,
                "track": { "id": "FKYVlOXV8Q" }
            }]
        }

        # Act
        serializer = serializers.PlaylistSerializer(data=invalid_playlist_data)
        valid = serializer.is_valid()

        # Assert
        self.assertFalse(valid)

    def test_playlist_tracks_need_to_exist(self):
        # Arrange
        invalid_playlist_data = {
            "title": "valid title",
            "tracks": [{
                "order": 0,
                "track": { "id": "FKYVlOXV8Q" }
            },
            {
                "order": 1,
                "track": { "id": "fake-id" }
            }]
        }

        # Act
        serializer = serializers.PlaylistSerializer(data=invalid_playlist_data)
        valid = serializer.is_valid()

        # Assert
        self.assertFalse(valid)

    @classmethod
    def _create_track(cls, track_data):
        track, created = models.Track.objects.get_or_create(
            id=track_data["id"],
            title=track_data["title"],
            length=track_data["length"],
            bpm=track_data["bpm"],
        )

        if not created:
            return

        for main_artist in track_data["main_artists"]:
            track.main_artists.get_or_create(name=main_artist)
        for featured_artist in track_data["featured_artists"]:
            track.featured_artists.get_or_create(name=featured_artist)
        for genre in track_data["genres"]:
            track.genres.get_or_create(name=genre)
        for mood in track_data["moods"]:
            track.moods.get_or_create(name=mood)
        track.save()
