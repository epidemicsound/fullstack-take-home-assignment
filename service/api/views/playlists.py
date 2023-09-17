from django.db import IntegrityError
from django.http import Http404
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from api import models, serializers


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.AllowAny]  # TODO: update

    @action(methods=["get"], detail=True, url_path="tracks")
    def playlist_tracks(self, request, pk=None):
        tracks = self.get_object().playlisttrack_set.order_by("order").only("track_id")
        serializer = serializers.TrackIDSerializer(
            instance=[track.track_id for track in tracks]
        )
        headers = self.get_success_headers(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
            headers=headers,
        )

    @playlist_tracks.mapping.post
    def add_track(self, request, pk=None):
        playlist = self.get_object()
        errors = []

        last_track = models.PlaylistTrack.objects.filter(playlist=playlist).latest()
        last_order = last_track.order
        for track in request.data:
            playlist_track = models.PlaylistTrack(
                track_id=track["track_id"],
                playlist=playlist,
                order=last_order,
            )

            try:
                playlist_track.save()
                last_order += 1

            except IntegrityError as e:
                errors.append(track)

        tracks = playlist.playlisttrack_set.order_by("order").only("track_id")
        serializer = serializers.TrackIDSerializer(
            instance=[track.track_id for track in tracks]
        )
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
            headers=headers,
        )

    @action(methods=["delete"], detail=True, url_path="tracks/(?P<track_pk>[^/.]+)")
    def remove_track(self, request, pk=None, track_pk=None):
        track = models.PlaylistTrack.objects.filter(playlist_id=pk, track_id=track_pk)
        if not track:
            raise Http404("Track not found in playlist")

        track.delete()

        headers = self.get_success_headers({})
        return Response(
            status=status.HTTP_204_NO_CONTENT,
            headers=headers,
        )
