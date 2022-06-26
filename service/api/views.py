from django import http
from rest_framework import permissions, viewsets

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.AllowAny]


class ListingViewSet(viewsets.ViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.AllowAny]

    def load(self, pk):
        playlist_id, track_id = pk.split("-")
        playlist = models.Playlist.objects.filter(id=playlist_id).first()
        track = models.Track.objects.filter(id=track_id).first()

        return [playlist, track]

    def retrieve(self, request, pk=None):
        playlist, track = self.load(pk)

        if (track in playlist.tracks.all()):
            return http.HttpResponse("{}", status=200)
        else:
            return http.HttpResponse('{"error": "edge not found"}', status=404)

    def update(self, request, pk=None):
        playlist, track = self.load(pk)

        if (track in playlist.tracks.all()):
            return http.HttpResponse('{"message": "already there"}', status=200)
        else:
            playlist.append_track(track)
            return http.HttpResponse('{"message": "added"}', status=201)

    def delete(self, request, pk=None):
        playlist, track = self.load(pk)

        if (not track in playlist.tracks.all()):
            return http.HttpResponse('{"error": "already gone"}', status=404)
        else:
            playlist.tracks.remove(track)
            return http.HttpResponse('{"message": "removed"}', status=200)
