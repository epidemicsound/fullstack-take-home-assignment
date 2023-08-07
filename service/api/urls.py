from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlists", views.PlaylistViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "playlists/<str:playlist_id>/add/<str:track_id>/",
        views.AddTrackToPlaylist.as_view(),
        name="add-track",
    ),
    path(
        "playlists/<str:playlist_id>/remove/<str:track_id>/",
        views.RemoveTrackFromPlaylist.as_view(),
        name="remove-track",
    ),
]
