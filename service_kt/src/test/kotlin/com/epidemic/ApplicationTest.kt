package com.epidemic

import com.epidemic.clients.MetadataClient
import com.epidemic.models.Track
import com.epidemic.models.TrackResponse
import io.ktor.http.*
import io.ktor.client.request.*
import kotlin.test.*
import io.ktor.server.testing.*
import com.epidemic.plugins.*
import io.ktor.client.statement.*
import io.mockk.coEvery
import io.mockk.mockkConstructor
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ApplicationTest {

    @Test
    fun `GET tracks returns list of available tracks`() = testApplication {
        val track = Track(
            id = "FKYVlOXV8Q",
            title = "Slum VIllage",
            length = 166,
            bpm = 148,
            genres = listOf("Mainstream Hip Hop"),
            moods = listOf("Dark", "Restless"),
            main_artists = listOf("Tilden Parc"),
            featured_artists = emptyList(),
        )

        mockkConstructor(MetadataClient::class)

        coEvery {
            anyConstructed<MetadataClient>().getTracks()
        } returns listOf(track)
        application {
            configureRouting()
        }

        client.get("/tracks").apply {
            assertEquals(HttpStatusCode.OK, status)
            val tracks = Json.decodeFromString<List<TrackResponse>>(bodyAsText())
            assertEquals(1, tracks.size)
            assertEquals(listOf(TrackResponse(track)), tracks)
        }
    }
}