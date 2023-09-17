from rest_framework import serializers

from api import models


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "title",
        ]


class PlaylistTracksSerializer(PlaylistSerializer):
    tracks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Playlist
        fields = PlaylistSerializer.Meta.fields + ["tracks"]
