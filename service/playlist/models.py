from django.db import models
from api.models import Track


class Playlist(models.Model):
    name = models.CharField(max_length=250, null=False)
    created_date = models.DateField(auto_now_add=True)
    last_updated_date = models.DateField(auto_now=True)
    tracks = models.ManyToManyField(Track, related_name="related_playlists", blank=True, null=True)
    order = models.PositiveSmallIntegerField

    def add_track(self, track):
        self.tracks.add(track)
        self.save()

    def remove_track(self, track):
        self.tracks.remove(track)
