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
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        playlists = models.Playlist.objects.all()
        serializer = serializers.PlaylistSerializer(playlists, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        if not pk:
            return response.Response("Missing playlist id.", status=status.HTTP_400_BAD_REQUEST)

        playlist = models.Playlist.objects.get(id=pk)
        playlist_tracks = models.PlaylistTrack.objects.filter(playlist=playlist)

        if not playlist:
            return response.Response(f"No playlist with id {pk} found.", status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PlaylistTrackSerializer(playlist_tracks, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = serializers.PlaylistSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.get('title')
        playlist = models.Playlist.objects.create(title=title)
        playlist.save()

        track_and_order_tuples = self._get_playlist_tracks_From_request(request.data)
        for (track, order) in track_and_order_tuples:
            playlistTrack = models.PlaylistTrack.objects.create(track=track, playlist=playlist, order=order)
            playlistTrack.save()

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

        track_and_order_tuples = self._get_playlist_tracks_From_request(request.data)
        for (track, order) in track_and_order_tuples:
            playlistTrack, _ = models.PlaylistTrack.objects.get_or_create(track=track, playlist=playlist)
            playlistTrack.order = order
            playlistTrack.save()

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

    def _track_from_track_data(self, track_data):
        if not track_data:
            return None
        return models.Track.objects.get(id=track_data["id"])

    def _get_playlist_tracks_From_request(self, request_data):
        playlist_tracks = []
        playlist_tracks_data = request_data.get("tracks", [])
        for playlist_track_data in playlist_tracks_data:
            track = self._track_from_track_data(playlist_track_data["track"])
            order = playlist_track_data["order"]
            if track is not None:
                playlist_tracks.append((track, order))
        return playlist_tracks
