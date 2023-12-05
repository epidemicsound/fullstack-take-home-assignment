from rest_framework import permissions, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models, serializers
from models import Playlist, Track


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


"""
These should be included in viewsets.ModelViewSet

@api_view(['POST'])
def create_playlist(request):
    playlist = PlaylistSerializer(data=request.data)
    if playlist.is_valid():
        playlist.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(playlist.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_playlist(request, playlist_id):
    try:
        playlist = Playlist.objects.get(playlist_id)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    playlist.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)"""

@api_view
def add_track(request, playlist_id, track_id):
    try:
        playlist = Playlist.objects.get(playlist_id)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        track = Track.objects.get(track_id)
    except Track.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    playlist.tracks.add(track)

    playlist.save()

@api_view
def delete_track(request, playlist_id, track_id):
    try:
        playlist = Playlist.objects.get(playlist_id)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        track = Track.objects.get(track_id)
    except Track.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    playlist.tracks.remove(track)

    playlist.save()
