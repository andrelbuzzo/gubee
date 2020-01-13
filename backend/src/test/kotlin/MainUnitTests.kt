import io.github.rybalkinsd.kohttp.dsl.httpGet
import io.kotlintest.*
import io.kotlintest.specs.StringSpec
import okhttp3.Response

const val API = "/api/products/"
const val HOST = "localhost"
const val PORT = 8080

class MainUnitTests : StringSpec({

    "call '/api/products'" {
        var params = "targetMarket=&stack="

        try {
            val response: Response = httpGet {
                host = HOST
                port = PORT
                path = "$API/$params"
            }

            response.code() shouldBe 200
        } catch (e: Exception){
            e.printStackTrace()
        }
    }

    "call '/api/products' with params" {
        var params = "targetMarket=&stack=Java"

        try {
            val response: Response = httpGet {
                host = HOST
                port = PORT
                path = "$API/$params"
            }

            response.code() shouldBe 200
        } catch (e: Exception){
            e.printStackTrace()
        }
    }
})