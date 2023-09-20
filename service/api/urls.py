from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlists", views.PlaylistViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", obtain_auth_token, name='login'),
]
