# Generated by Django 4.1.5 on 2023-12-04 14:59

from django.db import migrations


def add_test_playlists(apps, schema_editor):
    Playlist = apps.get_model('api', 'Playlist')
    PlaylistTrack = apps.get_model('api', 'PlaylistTrack')
    User = apps.get_model('auth', 'User')
    test_user = User.objects.get(username='test')

    playlists_data = [
        {'name': 'Playlist 1', 'user': test_user, 'tracks': ["FKYVlOXV8Q", "ZkuGOyOiiE", "em55KruCAt"]},
        {'name': 'Playlist 2', 'user': test_user, 'tracks': ["mX542l3F2Q", "IFZpDGwLZD", "b1Oq8Scoei"]},
        {'name': 'Playlist 3', 'user': test_user, 'tracks': ["RZQbWVB8XQ", "Ru3QrB13Uf", "Uec7QGEctL"]},
    ]

    for playlist_data in playlists_data:
        playlist = Playlist.objects.create(name=playlist_data['name'], user=playlist_data['user'])

        for index, track_id in enumerate(playlist_data['tracks']):
            PlaylistTrack.objects.create(playlist=playlist, track_id=track_id, order=index + 1)


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0004_test_user'),
    ]

    operations = [
        migrations.RunPython(add_test_playlists),
    ]
