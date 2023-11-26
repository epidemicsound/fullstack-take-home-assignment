from django.test import TestCase
from . import serializers, models


class PlaylistSerializerTests(TestCase):
    def setUp(self):
        self.serializer_data = {
            "id": "1",
            "name": "Test Playlist",
            "created_date": "2020-01-01",
            "last_updated_date": "2020-01-01",
            "tracks": [

            ],
        }
        self.playlist = models.Playlist.objects.create(**self.serializer_data)
        self.serializer = serializers.PlaylistSerializer(instance=self.playlist)

    def test_ensure_playlist_fields_are_not_changed(self):
        data = self.serializer.data

        self.assertEqual(set(data.keys()), {"id", "name", "created_date", "last_updated_date", "tracks"})
