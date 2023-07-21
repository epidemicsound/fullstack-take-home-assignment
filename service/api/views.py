from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer

    def create(self, request):
        data = request.data
        tracks_ids = data.pop("tracks")
        tracks = [models.Track.objects.get(id=track_id) for track_id in tracks_ids]
        playlist = models.Playlist.objects.create(**data)
        playlist.tracks.set(tracks)
        serializer = serializers.PlaylistSerializer(models.Playlist.objects.all(), many=True)
        return Response(serializer.data)