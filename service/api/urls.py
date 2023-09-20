from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", obtain_auth_token, name='login'),
    path("playlists/", views.Playlist.as_view(), name="playlist"),
]
