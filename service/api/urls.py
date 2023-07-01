from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r'playlists', views.PlaylistViewSet, basename='playlist')

urlpatterns = [
    path("", include(router.urls)),
    # path('playlists/', views.PlaylistListAPIView.as_view(), name='playlist_list'),
    path('playlists/<int:playlist_id>/', views.PlaylistDetailAPIView.as_view(), name='playlist_detail'),
    path('playlists/<int:playlist_id>/tracks/', views.PlaylistTracksAPIView.as_view(), name='playlist_tracks'),
]
