from django.conf import settings
from django.db import models
from django.db.models import Max, F


class Artist(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"{self.name}"


class Genre(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"{self.name}"


class Mood(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"{self.name}"


class Track(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    title = models.CharField(max_length=200, null=False)
    genres = models.ManyToManyField(Genre, related_name="genre")
    moods = models.ManyToManyField(Mood, related_name="mood")
    main_artists = models.ManyToManyField(Artist, related_name="main_artist")
    featured_artists = models.ManyToManyField(Artist, related_name="featured_artist")
    length = models.IntegerField(default=0)
    bpm = models.IntegerField(default=0)

    @property
    def audio(self):
        return "{}{}.{}".format(settings.ASSETS_BASE, self.id, "mp3")

    @property
    def cover_art(self):
        return "{}{}.{}".format(settings.ASSETS_BASE, self.id, "jpg")

    @property
    def waveform(self):
        return "{}{}.{}".format(settings.ASSETS_BASE, self.id, "json")

    @property
    def spotify(self):
        return "{}{}/{}".format(settings.DSP_BASE, self.id, "spotify")


class Playlist(models.Model):
    name = models.CharField(max_length=250, null=False)
    created_date = models.DateField(auto_now_add=True)
    last_updated_date = models.DateField(auto_now=True)
    tracks = models.ManyToManyField(Track, through='PlaylistTrack', related_name="playlists", blank=True)

    def add_track(self, track_id, order=None):
        current_highest_order = self.tracks.aggregate(max_order=Max('playlisttrack__order')).get('max_order', 0)
        track_object = Track.objects.get(pk=track_id)

        playlist_track, created = PlaylistTrack.objects.get_or_create(
            playlist=self,
            track=track_object,
            defaults={'order': order or (current_highest_order + 1)}
        )

    def remove_track(self, track):
        self.tracks.remove(track)


class PlaylistTrack(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField(default=1, null=False, blank=False)

    class Meta:
        db_table = 'api_playlist_tracks'
        unique_together = ('track', 'playlist')
