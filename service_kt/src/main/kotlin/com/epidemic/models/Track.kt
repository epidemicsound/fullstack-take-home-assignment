package com.epidemic.models

import com.epidemic.clients.BASE_URL


@kotlinx.serialization.Serializable
data class Track(
    val id: String,
    val title: String,
    val length: Int,
    val bpm: Int,
    val genres: List<String>,
    val moods: List<String>,
    val main_artists: List<String>,
    val featured_artists: List<String>,
)

@kotlinx.serialization.Serializable
data class TrackResponse(
    val id: String,
    val title: String,
    val length: Int,
    val bpm: Int,
    val genres: List<String>,
    val moods: List<String>,
    val main_artists: List<String>,
    val featured_artists: List<String>,
    val audio: String,
    val cover_art: String,
    val waveform: String,
    val spotify: String,
) {
    constructor(track: Track) : this(
        id = track.id,
        title = track.title,
        length = track.length,
        bpm = track.bpm,
        genres = track.genres,
        moods = track.moods,
        main_artists = track.main_artists,
        featured_artists = track.featured_artists,
        audio = "$BASE_URL/${track.id}.mp3",
        cover_art = "$BASE_URL/${track.id}.jpg",
        waveform = "$BASE_URL/${track.id}.json",
        spotify = "https://link.epidemicsound.com/${track.id}/spotify",
    )

}