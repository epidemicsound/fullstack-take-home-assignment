from rest_framework import serializers

from api import models


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "title",
        ]
