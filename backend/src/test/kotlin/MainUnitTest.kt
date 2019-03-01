import io.github.rybalkinsd.kohttp.dsl.httpGet
import io.kotlintest.*
import io.kotlintest.matchers.startWith
import io.kotlintest.specs.StringSpec
import io.kotlintest.specs.Test
import io.ktor.http.Url
import okhttp3.Response
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection

class MainUnitTest : StringSpec(){
    init {
        /*"length should return size of string" {
            "hello".length shouldBe  5
        }
        "startsWith should test for a prefix" {
            "world" should  startWith("wor")
        }*/

        "test calling api" {
            var api = "/api/products"
            var params = "targetMarket=&stack="

            val response: Response = httpGet {
                host = "localhost"
                port = 8080
                path = "$api/$params"
            }

            println( "-------" )
            println( response )
            println( response.code() )

            response.code() shouldBe 200
        }
    }
}