from rest_framework import serializers

from api import models
from api.serializers import TrackSerializer


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "title",
        ]


class PlaylistTracksSerializer(PlaylistSerializer):
    tracks = TrackSerializer(many=True, read_only=True)

    class Meta:
        model = models.Playlist
        fields = PlaylistSerializer.Meta.fields + ["tracks"]
