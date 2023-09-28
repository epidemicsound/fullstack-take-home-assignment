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
    
    def delete(self, request):
        # Delete a playlist
        try:
            playlist = models.Playlist.objects.get(id=request.data["id"])
        except models.Playlist.DoesNotExist:
            return Response({"error": "Playlist not found"}, status=status.HTTP_404_NOT_FOUND)
        playlist.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class InsertTrackIntoPlaylist(APIView):
    def post(self, request, playlist_id, track_id):
        try:
            # Retrieve the playlist and track objects
            playlist = models.Playlist.objects.get(id=playlist_id)
            track = models.Track.objects.get(id=track_id)
        except (models.Playlist.DoesNotExist, models.Track.DoesNotExist):
            return Response({"error": "Playlist or Track not found"}, status=status.HTTP_404_NOT_FOUND)

        # Add the track to the playlist
        playlist.tracks.add(track)

        # Serialize the updated playlist
        serialized_playlist = serializers.PlaylistSerializer(playlist)

        return Response(serialized_playlist.data, status=status.HTTP_200_OK)
    
    def delete(self, request, playlist_id, track_id):
        try:
            # Retrieve the playlist and track objects
            playlist = models.Playlist.objects.get(id=playlist_id)
            track = models.Track.objects.get(id=track_id)
        except (models.Playlist.DoesNotExist, models.Track.DoesNotExist):
            return Response({"error": "Playlist or Track not found"}, status=status.HTTP_404_NOT_FOUND)

        # Remove the track from the playlist
        playlist.tracks.remove(track)

        # Serialize the updated playlist
        serialized_playlist = serializers.PlaylistSerializer(playlist)

        return Response(serialized_playlist.data, status=status.HTTP_200_OK)