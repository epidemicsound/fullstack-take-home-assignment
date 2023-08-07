from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Playlist, Track
from .serializers import (
    PlaylistSerializer,
    CreatePlaylistSerializer,
    GetOnePlaylistSerializer,
    UpdatePlaylistSerializer,
    TrackSerializer,
)


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PlaylistViewSet(ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_classes = {
        "list": PlaylistSerializer,
        "create": CreatePlaylistSerializer,
        "retrieve": GetOnePlaylistSerializer,
        "update": UpdatePlaylistSerializer,
    }
    default_serializer_class = PlaylistSerializer

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, self.default_serializer_class)

    def get_queryset(self):
        queryset = super().get_queryset()
        sort_param = self.request.query_params.get("sort")

        if sort_param == "date":
            queryset = queryset.order_by("-created_at")
        elif sort_param == "name":
            queryset = queryset.order_by("name")

        return queryset


class AddTrackToPlaylist(APIView):
    def post(self, request, playlist_id, track_id):
        try:
            playlist = Playlist.objects.get(pk=playlist_id)
            track = Track.objects.get(pk=track_id)
        except Playlist.DoesNotExist:
            return Response(
                {"error": "Playlist not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Track.DoesNotExist:
            return Response(
                {"error": "Track not found."}, status=status.HTTP_404_NOT_FOUND
            )

        playlist.tracks.add(track)
        serializer = CreatePlaylistSerializer(playlist)
        return Response(serializer.data)


class RemoveTrackFromPlaylist(APIView):
    def delete(self, request, playlist_id, track_id):
        try:
            playlist = Playlist.objects.get(pk=playlist_id)
            track = Track.objects.get(pk=track_id)
        except Playlist.DoesNotExist:
            return Response(
                {"error": "Playlist not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Track.DoesNotExist:
            return Response(
                {"error": "Track not found."}, status=status.HTTP_404_NOT_FOUND
            )

        playlist.tracks.remove(track)
        serializer = CreatePlaylistSerializer(playlist)
        return Response(serializer.data)
