from rest_framework import serializers

from api import models
from api.serializers import TrackSerializer
from api.services import playlists as service


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "title",
        ]


class PlaylistTracksSerializer(PlaylistSerializer):
    tracks = serializers.SerializerMethodField("get_tracks")

    class Meta:
        model = models.Playlist
        fields = PlaylistSerializer.Meta.fields + ["tracks"]

    def get_tracks(self, playlist: models.Playlist):
        tracks = service.get_playlist_tracks(playlist=playlist)
        serializer = TrackSerializer(instance=tracks, many=True)
        return serializer.data
