import logging
from typing import List, Union

from django.db import IntegrityError
from django.http import Http404

from api import models


def get_playlist_tracks(playlist: models.Playlist) -> List[str]:
    tracks = playlist.playlisttrack_set.order_by("order").only("track_id")
    return [track.track_id for track in tracks]


def add_track_to_playlist(
    playlist: models.Playlist,
    tracks_data: List[dict],
) -> List[str]:
    errors = []

    last_track = models.PlaylistTrack.objects.filter(playlist=playlist).latest()
    last_order = last_track.order
    for track in tracks_data:
        playlist_track = models.PlaylistTrack(
            track_id=track["track_id"],
            playlist=playlist,
            order=last_order,
        )

        try:
            playlist_track.save()
            last_order += 1

        except IntegrityError as e:
            errors.append(track)

    logging.warning(f"Failed to add these tracks to playlist: [{errors}]")
    return get_playlist_tracks(playlist)


def delete_track_from_playlist(
    playlist_id: Union[str, int],
    track_id: str,
) -> bool:
    track = models.PlaylistTrack.objects.filter(
        playlist_id=playlist_id,
        track_id=track_id,
    )
    if not track:
        raise Http404("Track not found in playlist")

    track.delete()
    return True
