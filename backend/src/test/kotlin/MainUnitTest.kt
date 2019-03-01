import com.beust.klaxon.Klaxon
import io.github.rybalkinsd.kohttp.dsl.httpGet
import io.kotlintest.*
import io.kotlintest.specs.StringSpec
import okhttp3.Response

class MainUnitTest : StringSpec(){
    init {

        "call: /api/products" {
            var api = "/api/products"
            var params = "targetMarket=&stack="

            val response: Response = httpGet {
                host = "localhost"
                port = 8080
                path = "$api/$params"
            }

            val responseBody = Klaxon().toJsonString( response.body()!!.string() ).replace("\\r", "")

            var jsonString = """[
  {
    "productName": "Gubee Integrador",
    "description": "Ferramenta de integração para marketplaces",
    "targetMarket": [
      "Ecommerce",
      "ERP",
      "Lojistas que não desejam possuir ecommerce"
    ],
    "stack": [
      "Java 10",
      "Kotlin",
      "Kafka",
      "Event Stream",
      "Redis",
      "MongoDB"
    ]
  },
  {
    "productName": "Gubee Fretes",
    "description": "Ferramenta para gestão e calculo de fretes",
    "targetMarket": [
      "Ecommerce",
      "ERP",
      "Loja fisica"
    ],
    "stack": [
      "Java",
      "NodeJS",
      "MongoDB"
    ]
  },
  {
    "productName": "Gubee AntiFraude",
    "description": "Ferramenta especialistas em detecção e prevenção à fraude",
    "targetMarket": [
      "Ecommerce",
      "Telecom",
      "Venda direta",
      "Mobile First",
      "Digital Onboarding"
    ],
    "stack": [
      "Big Data Analytics",
      "Hadoop",
      "Kafka",
      "Pig",
      "Cassandra",
      "Oracle"
    ]
  },
  {
    "productName": "Gubee Pagamentos",
    "description": "Ferramenta de auxílio a pagamentos",
    "targetMarket": [
      "Ecommerce",
      "Venda direta",
      "Mobile First"
    ],
    "stack": [
      "Machine Learning",
      "MySql",
      "Java Oracle"
    ]
  }
]"""

            val expectedResponse = Klaxon().toJsonString( jsonString )

            response.code() shouldBe 200
            responseBody shouldBe expectedResponse
        }

    }
}