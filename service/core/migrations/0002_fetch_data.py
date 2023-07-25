import requests
from django.conf import settings
from django.db import migrations
import uuid


def fill_track_data(apps, schema_editor):
    r = requests.get(f"{settings.ASSETS_BASE}tracks.json")
    tracks = r.json()

    Track = apps.get_model("core", "Track")
    for track_data in tracks:
        track = Track.objects.create(
            id=uuid.uuid4(),
            external_id=track_data["id"],
            title=track_data["title"],
            length=track_data["length"],
            bpm=track_data["bpm"],
        )
        for main_artist in track_data["main_artists"]:
            track.main_artists.get_or_create(name=main_artist)
        for featured_artist in track_data["featured_artists"]:
            track.featured_artists.get_or_create(name=featured_artist)
        for genre in track_data["genres"]:
            track.genres.get_or_create(name=genre)
        for mood in track_data["moods"]:
            track.moods.get_or_create(name=mood)
        track.save()


class Migration(migrations.Migration):
    dependencies = [("core", "0001_initial")]

    operations = [
        migrations.RunPython(fill_track_data),
    ]
