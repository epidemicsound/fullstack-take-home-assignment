from django.urls import include, path
from rest_framework import routers

from playlist import views


router = routers.DefaultRouter()
router.register("playlists", views.PlaylistViewSet)

app_name = "playlist"

urlpatterns = [
    path("", include(router.urls)),
]
