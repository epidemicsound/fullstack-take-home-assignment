from rest_framework import serializers

from core.models import Playlist
from core.models import Track
from track.serializers import TrackSerializer


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(read_only=True, many=True, source="track_ids")
    track_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Track.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Playlist
        fields = ["id", "title", "track_ids", "tracks"]
        update_only_fields = ["title", "track_ids"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        track_ids = validated_data.pop("track_ids", [])

        playlist = Playlist.objects.create(**validated_data)
        playlist.track_ids.set(track_ids)

        return playlist


class TrackAddSerializer(serializers.ModelSerializer):
    track_id = serializers.UUIDField()

    class Meta:
        model = Playlist
        fields = ["track_id"]

    def add_track(self, playlist):
        """Add track to playlist."""
        track_id = self.validated_data.get("track_id")
        track = self.__get_track(track_id)

        if track in playlist.track_ids.all():
            raise serializers.ValidationError("Track already exists in playlist")

        playlist.track_ids.add(track_id)

        return playlist

    def __get_track(self, track_id):
        """Return track object."""
        try:
            return Track.objects.get(id=track_id)
        except Track.DoesNotExist:
            raise serializers.ValidationError("Track does not exist")
