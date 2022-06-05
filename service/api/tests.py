from rest_framework import status
from rest_framework.test import APITestCase

from api.models import Playlist, Track


class TracksTest(APITestCase):
    def test_tracks_data(self):
        response = self.client.get('/tracks/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 28)


class PlaylistsTest(APITestCase):
    def test_list_playlists(self):
        Playlist.objects.create(name='Some playlist')
        response = self.client.get('/playlists/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Some playlist')

    def test_create_playlist(self):
        name = 'Random name'
        data = {'name': name}
        response = self.client.post('/playlists/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Playlist.objects.count(), 1)
        self.assertEqual(Playlist.objects.get().name, name)

    def test_delete_playlist(self):
        playlist_id = Playlist.objects.create(name='Some playlist').id
        response = self.client.delete(f'/playlists/{playlist_id}/', format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Playlist.objects.count(), 0)

    def test_add_tracks(self):
        name = 'Some playlist'
        track_ids = map(lambda track: track.id, Track.objects.all()[:3])
        playlist_id = Playlist.objects.create(name='Some playlist').id
        data = {'name': name, 'tracks': track_ids}
        response = self.client.put(f'/playlists/{playlist_id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Playlist.objects.get().tracks.count(), 3)
