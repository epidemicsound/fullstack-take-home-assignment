from rest_framework import permissions

from core.models import Track
from core.custom_model_viewset import CustomModelViewSet
from track.serializers import TrackSerializer


class TrackViewSet(CustomModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
