from rest_framework import serializers

from . import models


class TrackSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    moods = serializers.StringRelatedField(many=True)
    main_artists = serializers.StringRelatedField(many=True)
    featured_artists = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Track
        fields = [
            "id",
            "title",
            "length",
            "bpm",
            "genres",
            "moods",
            "main_artists",
            "featured_artists",
            "audio",
            "cover_art",
            "waveform",
            "spotify",
        ]


class PlaylistTrackSerializer(serializers.ModelSerializer):
    track = TrackSerializer(read_only=True)

    class Meta:
        model = models.PlaylistTrack
        fields = [
            "id",
            "order",
            "track",
        ]


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = PlaylistTrackSerializer(many=True, read_only=True, source="playlisttrack_set")

    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "title",
            "tracks",
        ]

    def validate(self, data):
        playlist_tracks = self.initial_data.get("tracks", [])
        self._validate_orders(playlist_tracks)
        self._validate_tracks(playlist_tracks)
        return super().validate(data)

    def _validate_orders(self, playlist_tracks):
        orders = [p_t["order"] for p_t in playlist_tracks]

        # check if orders are in the correct interval
        max_valid_order = len(orders) - 1
        invalid_orders = [order for order in orders if order < 0 or order > max_valid_order]
        if len(invalid_orders) > 0:
            raise serializers.ValidationError(f"PlaylistTrack order cannot be negative or larger than the length of playlist. Offending values: {invalid_orders}")

        # check if orders are not repeated
        unique_orders = set(orders)
        if len(unique_orders) != len(orders):
            raise serializers.ValidationError("PlaylistTrack orders need to be unique")

    def _validate_tracks(self, playlist_tracks):
        tracks = [p_t["track"] for p_t in playlist_tracks]
        tracks_ids = [t["id"] for t in tracks]
        invalid_tracks = [id for id in tracks_ids if not models.Track.objects.filter(id=id).exists()]
        if len(invalid_tracks) > 0:
            raise serializers.ValidationError(f"Tracks {invalid_tracks} do not exist.")
