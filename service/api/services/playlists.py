import logging
from typing import List, Union, Tuple, Sequence

from django.db import IntegrityError, DataError
from django.http import Http404

from api import models, const


def get_playlist_tracks(playlist: models.Playlist) -> Sequence[models.Track]:
    tracks = models.Track.objects.filter(playlists__exact=playlist).order_by(
        "playlisttrack__order"
    )
    return tracks


def add_track_to_playlist(
    playlist: models.Playlist,
    tracks_data: List[dict],
) -> Tuple[Sequence[models.Track], List[Tuple[str, dict]]]:
    errors = []

    last_order = __get_last_order(playlist=playlist)
    for track in tracks_data:
        try:
            track_instance = models.Track.objects.get(id=track["track_id"])
        except models.Track.DoesNotExist:
            errors.append((const.TRACK_NOT_FOUND, track))
            continue

        playlist_track = models.PlaylistTrack(
            track=track_instance,
            playlist=playlist,
            order=last_order + 1,
        )

        try:
            playlist_track.save()
            last_order += 1

        except IntegrityError:
            errors.append((const.FAILED_TO_ADD, track))

        except DataError:
            errors.append((const.INVALID_DATA, track))

    logging.warning(f"Failed to add these tracks to playlist: [{errors}]")
    return get_playlist_tracks(playlist), errors


def __get_last_order(playlist: models.Playlist) -> int:
    try:
        last_track = models.PlaylistTrack.objects.filter(playlist=playlist).latest()
        last_order = last_track.order

    except models.PlaylistTrack.DoesNotExist:
        last_order = 0

    return last_order


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
