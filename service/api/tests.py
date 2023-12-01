from django.test import TestCase
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from . import serializers, models


class PlaylistSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.serializer_data = {
            "name": "Test Playlist",
            "user": self.user
        }
        models.Track.objects.create(title="Test Track 1")
        self.playlist = models.Playlist.objects.create(**self.serializer_data)
        self.serializer = serializers.PlaylistSerializer(instance=self.playlist)

    def test_ensure_playlist_fields_are_not_changed(self):
        data = self.serializer.data

        self.assertEqual(set(data.keys()), {"id", "name", "created_date", "last_updated_date", "tracks", "user"})

    def test_validate_no_name(self):
        data = {'tracks': [{'order': 1}, {'order': 2}]}
        serializer = serializers.PlaylistSerializer(data=data)
        with self.assertRaises(ValidationError):
            serializer.validate(data)

    def test_validate_duplicate_order(self):
        data = {'name': 'Test Playlist', 'tracks': [{'order': 1}, {'order': 1}]}
        serializer = serializers.PlaylistSerializer(data=data)
        with self.assertRaises(ValidationError):
            serializer.validate(data)

    def test_validate_duplicate_name(self):
        data = {'name': 'Test Playlist', 'tracks': [{'order': 1}, {'order': 2}]}
        serializer = serializers.PlaylistSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.validate(data)
