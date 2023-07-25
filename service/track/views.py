from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)

from rest_framework import permissions

from core.models import Track
from core.custom_model_viewset import CustomModelViewSet
from track.serializers import TrackSerializer


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
class TrackViewSet(CustomModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
