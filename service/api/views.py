from rest_framework import permissions, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models, serializers

class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.GetmanyPlaylistNameSerializer
        elif self.action == 'create':
            return serializers.CreatePlaylistSerializer
        elif self.action == 'retrieve':
            return serializers.GetOnePlaylistSerializer
        return super().get_serializer_class()


@api_view(['POST'])
def add_track_to_playlist(request, playlist_id, track_id):
    try:
        playlist = models.Playlist.objects.get(pk=playlist_id)
        track = models.Track.objects.get(pk=track_id)
    except models.Playlist.DoesNotExist:
        return Response({"error": "Playlist not found."}, status=status.HTTP_404_NOT_FOUND)
    except models.Track.DoesNotExist:
        return Response({"error": "Track not found."}, status=status.HTTP_404_NOT_FOUND)

    playlist.tracks.add(track)
    serializer = serializers.CreatePlaylistSerializer(playlist)
    return Response(serializer.data)

@api_view(['DELETE'])
def remove_track_from_playlist(request, playlist_id, track_id):
    try:
        playlist = models.Playlist.objects.get(pk=playlist_id)
        track = models.Track.objects.get(pk=track_id)
    except models.Playlist.DoesNotExist:
        return Response({"error": "Playlist not found."}, status=status.HTTP_404_NOT_FOUND)
    except models.Track.DoesNotExist:
        return Response({"error": "Track not found."}, status=status.HTTP_404_NOT_FOUND)

    playlist.tracks.remove(track)
    serializer = serializers.CreatePlaylistSerializer(playlist)
    return Response(serializer.data)
