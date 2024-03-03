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

        try:
            playlist = models.Playlist.objects.get(id=pk)
        except models.Playlist.DoesNotExist:
            return response.Response(f"Playlist with id {pk} not found.", status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.PlaylistSerializer(playlist)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = serializers.PlaylistSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.get('title')
        playlist = models.Playlist.objects.create(title=title)
        playlist.save()

        playlist_tracks = self._get_playlist_tracks_from_request(playlist, request.data)
        for playlist_track in playlist_tracks:
            playlist_track.save()

        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        if pk is None:
            return response.Response("Missing playlist id.", status=status.HTTP_400_BAD_REQUEST)

        try:
            playlist = models.Playlist.objects.get(id=pk)
        except models.Playlist.DoesNotExist:
            return response.Response(f"Playlist with id {pk} does not exist.", status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.PlaylistSerializer(instance=playlist, data=request.data, partial=True)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Update and create new PlaylistTrack entries
        playlist_tracks = self._get_playlist_tracks_from_request(playlist, request.data)
        for playlist_track in playlist_tracks:
            playlist_track.save()

        # Delete old PlaylistTrack entries no longer used
        used_ids = [p_t.id for p_t in playlist_tracks]
        playlist_tracks_to_delete = [p_t for p_t in models.PlaylistTrack.objects.all() if p_t.id not in used_ids]
        for to_delete in playlist_tracks_to_delete:
            to_delete.delete()

        serializer.save()
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        if pk is None:
            return response.Response("Missing playlist id.", status=status.HTTP_400_BAD_REQUEST)

        try:
            playlist = models.Playlist.objects.get(id=pk)
        except models.Playlist.DoesNotExist:
            return response.Response(f"Playlist with id {pk} does not exist.", status=status.HTTP_400_BAD_REQUEST)

        playlist.delete()
        return response.Response(f"Playlist with id {pk} successfully deleted.", status=status.HTTP_200_OK)

    def _track_from_track_data(self, track_data):
        if not track_data:
            return None
        return models.Track.objects.get(id=track_data["id"])

    def _get_playlist_tracks_from_request(self, playlist, request_data):
        playlist_tracks = []
        playlist_tracks_data = request_data.get("tracks", [])
        for playlist_track_data in playlist_tracks_data:
            playlist_track_id = playlist_track_data.get("id", None)
            playlist_track_order = playlist_track_data.get("order", None)
            if playlist_track_id is not None:
                playlist_track = models.PlaylistTrack.objects.get(id=playlist_track_id)
                playlist_track.order = playlist_track_order
                playlist_tracks.append(playlist_track)
            else:
                track = self._track_from_track_data(playlist_track_data["track"])
                playlist_track, _ = models.PlaylistTrack.objects.get_or_create(track=track, playlist=playlist, order=playlist_track_order)
                playlist_tracks.append(playlist_track)
        return playlist_tracks
