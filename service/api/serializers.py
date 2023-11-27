from rest_framework import serializers
from rest_framework.exceptions import ValidationError

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
    track = TrackSerializer()

    class Meta:
        model = models.PlaylistTrack
        fields = ['track', 'order']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = PlaylistTrackSerializer(source='playlisttrack_set', many=True, read_only=True)

    class Meta:
        model = models.Playlist
        fields = ["id", "created_date", "name", "last_updated_date", "tracks"]

    def validate(self, data):
        tracks_data = self.initial_data.get('tracks', [])

        orders = [track.get('order') for track in tracks_data if 'order' in track]

        if len(set(orders)) != len(orders):
            raise ValidationError("Order values must be unique.")

        if 'name' not in data or data['name'] is None:
            raise ValidationError("Name cannot be null.")

        existing_playlists = models.Playlist.objects.filter(name=data['name'])
        if self.instance and self.instance.id:
            existing_playlists = existing_playlists.exclude(id=self.instance.id)

        if existing_playlists.exists():
            raise serializers.ValidationError("A playlist with the same name already exists.")

        return data
