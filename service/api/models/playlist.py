from django.conf import settings
from django.db import models

from api.models.track import Track


class Playlist(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, null=False)
    tracks = models.ManyToManyField(
        Track, through="PlaylistTrack", related_name="playlists"
    )


class PlaylistTrack(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    order = models.IntegerField()

    class Meta:
        unique_together = ("playlist_id", "track_id")
        get_latest_by = "order"
