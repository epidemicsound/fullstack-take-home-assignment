from typing import Optional

from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from api import models, serializers
from api.services import playlists as service


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistTracksSerializer
    permission_classes = [
        permissions.AllowAny
    ]  # TODO: update permissions to authorized user

    @action(methods=["get"], detail=True, url_path="tracks")
    def playlist_tracks(
        self,
        request: Request,
        pk: Optional[str] = None,
    ) -> Response:
        tracks = service.get_playlist_tracks(playlist=self.get_object())

        serializer = serializers.TrackIDSerializer(instance=tracks)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @playlist_tracks.mapping.post
    def add_track(
        self,
        request: Request,
        pk: Optional[str] = None,
    ) -> Response:
        tracks = service.add_track_to_playlist(
            playlist=self.get_object(),
            tracks_data=request.data,
        )

        serializer = serializers.TrackIDSerializer(instance=tracks)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["delete"], detail=True, url_path="tracks/(?P<track_pk>[^/.]+)")
    def delete_track(
        self,
        request: Request,
        pk: Optional[str] = None,
        track_pk: Optional[str] = None,
    ) -> Response:
        service.delete_track_from_playlist(playlist_id=pk, track_id=track_pk)

        return Response(status=status.HTTP_204_NO_CONTENT)
