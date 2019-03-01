import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.response.header
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import java.io.BufferedReader
import java.io.File

/**
 * Main function called when initialized
 * */
fun main(args: Array<String>) {
    embeddedServer(Netty, 8080) {
        routing {
            get("/api/products/targetMarket={targetMarket}&stack={stack}") {
                call.response.header("Access-Control-Allow-Origin", "*")
                call.respondText( readFile( "json/gubee-teste.json" ), ContentType.Application.Json )
            }
        }
    }.start(wait = true)
}

/**
 * Utility function to read the JSON file
 * */
fun readFile( filepath: String ): String {
    var inputString = String()
    try {
        val bufferedReader: BufferedReader = File( ClassLoader.getSystemResource( filepath ).file ).bufferedReader()
        inputString = bufferedReader.use { it.readText() }
    } catch (e:Exception){
        println(e)
    } finally {
        return inputString
    }
}

//data class Entry(val message: String)