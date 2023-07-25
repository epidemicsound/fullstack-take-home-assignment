from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from core.models import Playlist
from core.custom_response import CustomResponse
from core.custom_model_viewset import CustomModelViewSet

from playlist.serializers import PlaylistSerializer, TrackAddSerializer


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                "filter",
                OpenApiTypes.STR,
                description="An object describing the filter criteria",
            ),
            OpenApiParameter(
                "limit",
                OpenApiTypes.NUMBER,
                description="Number of results to return",
            ),
            OpenApiParameter(
                "sort_by",
                OpenApiTypes.STR,
                description="Field to sort by",
            ),
            OpenApiParameter(
                "skip",
                OpenApiTypes.NUMBER,
                description="Number of results to skip",
            ),
        ]
    )
)
class PlaylistViewSet(CustomModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.AllowAny]
    renderer_classes = [CustomResponse]

    def get_serializer_class(self):
        """Return the serializer class for request."""
        if self.action == "add_track":
            return TrackAddSerializer

        return self.serializer_class

    @action(methods=["POST"], detail=True, url_path="add-track")
    def add_track(self, request, pk=None):
        """Add track to playlist."""
        playlist = self.get_object()
        serializer = self.get_serializer(playlist, data=request.data)

        if serializer.is_valid():
            serializer.add_track(playlist)
            return Response(
                {
                    "result": "Track added to the playlist successfully.",
                    "success": True,
                },
                status=200,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=["DELETE"], detail=True, url_path="remove-track/(?P<track_id>[^/.]+)"
    )
    def remove_track(self, request, pk=None, track_id=None):
        """Remove track from playlist."""
        playlist = self.get_object()

        track_ids = list(playlist.track_ids.all().values_list("id", flat=True))
        track_ids = [str(track_id) for track_id in track_ids]

        if track_id not in track_ids:
            return Response(
                {"message": "Track does not exist in playlist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        playlist.track_ids.remove(track_id)
        return Response(
            {
                "result": {"message": "Track removed from the playlist successfully."},
                "success": True,
            },
            status=200,
        )
