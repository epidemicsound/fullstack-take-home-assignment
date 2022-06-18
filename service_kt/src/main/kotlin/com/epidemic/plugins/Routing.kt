package com.epidemic.plugins

import com.epidemic.clients.MetadataClient
import com.epidemic.models.TrackResponse
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Application.configureRouting() {

    routing {
        get("/tracks") {
            val tracks = MetadataClient().getTracks()
            call.respond(
                tracks.map { track ->
                    TrackResponse(track)
                }
            )
        }
    }
}
