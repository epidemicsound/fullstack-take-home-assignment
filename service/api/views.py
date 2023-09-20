from django.contrib.auth import login, logout
from rest_framework import permissions, viewsets, status, views, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models, serializers

# TODO: Refactor this to separate concerns
class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Playlist(APIView):
    def get(self, request):
        # Retrieve all playlists
        playlists = models.Playlist.objects.all()

        # Serialize the playlists
        serialized_playlists = serializers.PlaylistSerializer(playlists, many=True)

        return Response(serialized_playlists.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Create a new playlist
        playlist = models.Playlist.objects.create(name=request.data["name"])
        print("playlist")
        print(playlist)

        # Serialize the playlist
        serialized_playlist = serializers.PlaylistSerializer(playlist)

        print("serialized_playlist")
        print(serialized_playlist)

        return Response(serialized_playlist.data, status=status.HTTP_201_CREATED)
