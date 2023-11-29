from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        playlists = models.Playlist.objects.all()
        serialized_playlists = serializers.PlaylistSerializer(playlists, many=True)
        return Response(serialized_playlists.data, status.HTTP_200_OK)

    def retrieve(self, request, pk):
        playlists = models.Playlist.objects.filter(pk=pk).first()
        serialized_playlist = serializers.PlaylistSerializer(playlists)
        return Response(serialized_playlist.data, status.HTTP_200_OK)

    def create(self, request):
        playlist_serializer = serializers.PlaylistSerializer(data=request.data)
        if playlist_serializer.is_valid(raise_exception=True):
            playlist_serializer.save()
        return Response(playlist_serializer.data, status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        playlist = models.Playlist.objects.filter(pk=pk).first()

        for track in request.data['tracksToAdd']:
            playlist.add_track(track['id'], track['order'])

        for track in request.data['tracksToDelete']:
            playlist.remove_track(track)

        playlist_serializer = serializers.PlaylistSerializer(playlist, data={'name': request.data['name']},
                                                             partial=True)
        if playlist_serializer.is_valid(raise_exception=True):
            playlist_serializer.save()

        return Response(playlist_serializer.data, status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        playlist = models.Playlist.objects.filter(pk=pk).first()
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
