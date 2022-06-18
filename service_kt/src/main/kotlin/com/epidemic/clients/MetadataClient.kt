package com.epidemic.clients

import com.epidemic.models.Track
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.apache.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.compression.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*

/**
 * BASE URL for the Epidemic Sound content
 */
const val BASE_URL: String = "https://storage.googleapis.com/tech-coding-interview-assets"

val genericHttpClient = HttpClient(Apache) {
    install(HttpTimeout) {}
    install(ContentNegotiation) {
        json()
    }

    install(Logging) {
        level = LogLevel.INFO
    }

    ContentEncoding {
        deflate()
        gzip()
        identity()
    }
}

class MetadataClient(
    private val httpClient: HttpClient = genericHttpClient
) {

    suspend fun getTracks(): List<Track> {
        return genericHttpClient.get(
            "${BASE_URL}/tracks.json"
        ).body()
    }
}
