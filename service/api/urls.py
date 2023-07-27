from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlists", views.PlaylistViewSet)

urlpatterns = [
    path("", include(router.urls)),

    # API for adding a track to a playlist
    path('playlists/<str:playlist_id>/add_track/<str:track_id>/', views.add_track_to_playlist, name='add-track-to-playlist'),

    # API for removing a track from a playlist
    path('playlists/<str:playlist_id>/remove_track/<str:track_id>/', views.remove_track_from_playlist, name='remove-track-from-playlist'),

]
