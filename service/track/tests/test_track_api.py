from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Track

from track.serializers import TrackSerializer

TRACKS_URL = reverse("track:track-list")


class PublicTrackApiTests(TestCase):
    """Test the publicly available track API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_not_required(self):
        """Test that login is required for retrieving tracks"""
        res = self.client.get(TRACKS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_tracks(self):
        """Test retrieving tracks"""

        res = self.client.get(TRACKS_URL)

        tracks = Track.objects.all().order_by("-title")
        serializer = TrackSerializer(tracks, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["result"]), len(serializer.data))

    def test_get_tracks_with_filter(self):
        """Test retrieving tracks with filter"""

        res = self.client.get(TRACKS_URL, {"filter": '{"title": "Backyard Stories"}'})

        tracks = Track.objects.filter(title="Backyard Stories")
        serializer = TrackSerializer(tracks, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data[0]["title"], res.data["result"][0]["title"])

    def test_get_track_by_id(self):
        """Test retrieving a track by id"""

        track = Track.objects.all().first()

        res = self.client.get(reverse("track:track-detail", args=[track.id]))

        serializer = TrackSerializer(track)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data["title"], res.data["result"]["title"])

    def test_get_track_by_id_not_found(self):
        """Test retrieving a track by id not found"""

        res = self.client.get(reverse("track:track-detail", args=["123"]))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
