import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Klaxon
import com.beust.klaxon.Parser
import io.github.rybalkinsd.kohttp.dsl.httpGet
import io.kotlintest.*
import io.kotlintest.specs.StringSpec
import io.kotlintest.specs.Test
import io.restassured.specification.RequestSpecification
import okhttp3.Response
import org.junit.jupiter.api.Assertions

const val API = "/api/products/"
const val HOST = "localhost"
const val PORT = 8080

class MainUnitTests : StringSpec({

    "call /api/products" {
        var params = "targetMarket=&stack="

        val response: Response = httpGet {
            host = HOST
            port = PORT
            path = "$API/$params"
        }

        response.code() shouldBe 200
    }

    "call /api/products with params" {
        var params = "targetMarket=&stack=Java"

        val response: Response = httpGet {
            host = HOST
            port = PORT
            path = "$API/$params"
        }

        response.code() shouldBe 200
    }
})