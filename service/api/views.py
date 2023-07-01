from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from . import models, serializers
from . models import Playlist, Track
from . serializers import PlaylistSerializer, TrackSerializer


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def create(self, request, *args, **kwargs):
        tracks_data = request.data.pop('tracks', [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        playlist = serializer.instance
        for track_id in tracks_data:
            track = Track.objects.get(id=track_id)
            playlist.tracks.add(track)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post'])
    def add_track(self, request, pk=None):
        playlist = self.get_object()
        track_id = request.data.get('track_id')
        if not track_id:
            return Response({'detail': 'Please provide a track_id.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            track = Track.objects.get(id=track_id)
        except Track.DoesNotExist:
            return Response({'detail': 'Track does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        playlist.tracks.add(track)
        return Response({'detail': 'Track added successfully.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def remove_track(self, request, pk=None):
        playlist = self.get_object()
        track_id = request.data.get('track_id')
        if not track_id:
            return Response({'detail': 'Please provide a track_id.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            track = Track.objects.get(id=track_id)
        except Track.DoesNotExist:
            return Response({'detail': 'Track does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        playlist.tracks.remove(track)
        return Response({'detail': 'Track removed successfully.'}, status=status.HTTP_200_OK)

# class PlaylistListAPIView(APIView):
#     def get(self, request):
#         playlists = models.Playlist.objects.all()
#         serializer = serializers.PlaylistSerializer(playlists, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = serializers.PlaylistSerializer(data=request.data)
#         if serializer.is_valid():
#             playlist = serializer.save()

#             track_ids = request.data.get('track_ids', [])
#             tracks_added = []
#             for track_id in track_ids:
#                 try:
#                     track = models.Track.objects.get(id=track_id)
#                 except models.Track.DoesNotExist:
#                     continue
#                 playlist.tracks.add(track)
#                 tracks_added.append(track_id)

#             response_data = {
#                 'playlist': serializer.data,
#                 'tracks_added': tracks_added
#             }
#             return Response(response_data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlaylistDetailAPIView(APIView):
    def get(self, request, playlist_id):
        try:
            playlist = models.Playlist.objects.get(id=playlist_id)
        except models.Playlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PlaylistSerializer(playlist)
        return Response(serializer.data)

    def delete(self, request, playlist_id):
        try:
            playlist = models.Playlist.objects.get(id=playlist_id)
        except models.Playlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PlaylistTracksAPIView(APIView):
    def post(self, request, playlist_id):
        try:
            playlist = models.Playlist.objects.get(id=playlist_id)
        except models.Playlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        track_id = request.data.get('track_id')
        try:
            track = models.Track.objects.get(id=track_id)
        except models.Track.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        playlist.tracks.add(track)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, playlist_id):
        try:
            playlist = models.Playlist.objects.get(id=playlist_id)
        except models.Playlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        track_id = request.data.get('track_id')
        try:
            track = models.Track.objects.get(id=track_id)
        except models.Track.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        playlist.tracks.remove(track)
        return Response(status=status.HTTP_200_OK)
