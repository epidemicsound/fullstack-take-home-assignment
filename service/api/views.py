from rest_framework import permissions, viewsets, generics, status
from .models import Playlist, Track
from rest_framework.response import Response
from .serializers import PlaylistSerializer, TrackSerializer
from rest_framework.generics import GenericAPIView

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TrackDetailView(generics.RetrieveAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "id"


    

class PlaylistListView(GenericAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data[:]
        # Fetch all tracks and serialize them separately
        playlist_tracks = {}
        for playlist in list(data):
            playlist = dict(playlist)
            playlist_tracks[playlist.get('id')] = playlist.get('tracks')

        track_details = {}
        for key,values in playlist_tracks.items():
            tracks = Track.objects.filter(id__in=values)
            track_serializer = TrackSerializer(tracks, many=True)
            track_details[key] = track_serializer.data

        # Create a dictionary with track IDs as keys and serialized tracks as values
        track_details = {track['id']: track for track in track_serializer.data}

        # Replace track IDs with track details in the response
        for playlist in serializer.data:
            playlist['tracks'] = [track_details[track_id] for track_id in playlist['tracks']]

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Create a new Playlist instance
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()  # Get the playlist instance to delete
        instance.delete()
        return Response(
            data="Playlist deleted successfully.", 
            status=status.HTTP_204_NO_CONTENT)



class PlaylistTrackOperationView(GenericAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    track_operation = None  # To be set in subclasses as "add" or "delete"

    def perform_track_operation(self, playlist, track):
        if self.track_operation == "add":
            playlist.tracks.add(track)
        elif self.track_operation == "delete":
            playlist.tracks.remove(track)
        playlist.save()

    def post(self, request, *args, **kwargs):
        playlist = self.get_object()  # Get the playlist instance

        track_id = request.data.get('track_id')
        if track_id is None:
            return Response(
                data={'error': 'Please provide a valid track_id'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            track = Track.objects.get(id=track_id)
        except Track.DoesNotExist:
            return Response(
                data={'error': 'Track with the provided track_id does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        self.perform_track_operation(playlist, track)

        serializer = self.get_serializer(playlist)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AddTrackToPlaylistView(PlaylistTrackOperationView):
    track_operation = "add"

class DeleteTrackFromPlaylistView(PlaylistTrackOperationView):
    track_operation = "delete"