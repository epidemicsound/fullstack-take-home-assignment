from rest_framework import permissions, viewsets
from rest_framework import response
from rest_framework import status

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        playlists = models.Playlist.objects.all()
        serializer = serializers.PlaylistSerializer(playlists, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = serializers.PlaylistSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.get('title')
        playlist = models.Playlist.objects.create(title=title)

        tracks_data = request.data.get('tracks', [])
        for track_data in tracks_data:
            track = models.Track.objects.get(id=track_data['id'])
            if track is not None:
                playlist.tracks.add(track)

        playlist.save()
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        if pk is None:
            return response.Response("Missing playlist id.", status=status.HTTP_400_BAD_REQUEST)

        playlist = models.Playlist.objects.get(id=pk)
        if not playlist:
            return response.Response(f"Playlist with id {pk} does not exist.", status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.PlaylistSerializer(instance=playlist, data=request.data, partial=True)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        tracks_data = request.data.get('tracks', [])
        for track_data in tracks_data:
            track = models.Track.objects.get(id=track_data['id'])
            if track is not None:
                playlist.tracks.add(track)

        serializer.save()
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        if pk is None:
            return response.Response("Missing playlist id.", status=status.HTTP_400_BAD_REQUEST)

        playlist = models.Playlist.objects.get(id=pk)
        if not playlist:
            return response.Response(f"Playlist with id {pk} does not exist.", status=status.HTTP_400_BAD_REQUEST)

        playlist.delete()
        return response.Response(f"Playlist with id {pk} successfully deleted.", status=status.HTTP_200_OK)
