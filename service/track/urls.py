from django.urls import include, path
from rest_framework import routers

from track import views

router = routers.DefaultRouter()
router.register("tracks", views.TrackViewSet)

app_name = "track"

urlpatterns = [
    path("", include(router.urls)),
]
