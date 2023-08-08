from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)


urlpatterns = [
    path("playlists/", views.PlaylistListView.as_view(), name="playlist-list"),   
    path("playlists/<int:pk>/", views.PlaylistListView.as_view(), name="playlist-detail"),
    path("tracks/<str:track_id>/", views.TrackDetailView.as_view(), name="track-detail"),
    path("playlists/<int:pk>/add-track/", views.AddTrackToPlaylistView.as_view(), name="add-track-to-playlist"),
    path("playlists/<int:pk>/delete-track/", views.DeleteTrackFromPlaylistView.as_view(), name="delete-track-from-playlist"),
    path("", include(router.urls))
]
