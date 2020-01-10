import org.w3c.dom.*
import org.w3c.dom.events.Event
import org.w3c.xhr.XMLHttpRequest
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Json

val productsArray: MutableList<Json> = ArrayList()
val targetMarketList: MutableList<String> = ArrayList()
val stackList: MutableList<String> = ArrayList()
var productsToShow: Array<Json> = emptyArray()

/**
 * Main method that is called when 'index.html' is requested
 * */
fun main(args: Array<String>) {
    window.onload = {
        fetch(true, null, null)
        //bind elements
        var iptTargetMarket = document.getElementsByName("iptTargetMarket")
        var iptStack = document.getElementsByName("iptStack")
        val btnSearch = document.getElementById("btnSearch")
        val btnClear = document.getElementById("btnClear")

        //bind click listener on button
        btnSearch?.addEventListener("click", fun(event: Event) {
            loading(btnSearch)
            fetch(false, iptTargetMarket, iptStack)
        })

        btnClear?.addEventListener("click", fun(event: Event) {
            loading(btnClear)
            removeChecked(iptTargetMarket, iptStack)
            fetch(false, null, null)
        })
    }
}

/**
 * Endpoint
 * */
fun fetch(init: Boolean?, targetMarket: NodeList?, stack: NodeList?): Unit {
    var checkedTM = String()
    var checkedStacks: MutableList<String> = ArrayList()

    targetMarket?.forEach { tm ->
        var temp = tm as HTMLInputElement
        if (temp.checked) {
            checkedTM = temp.value
        }
    }

    stack?.forEach { s ->
        var ipt = s as HTMLInputElement
        if (ipt.checked) {
            checkedStacks.add(ipt.value)
        }
    }

    val url = sanitizeUrl(checkedTM, checkedStacks)
    println(url) // TODO: remove after tests

    val req = XMLHttpRequest()
    req.onloadend = fun(event: Event) {
        if (init == true) {
            val text = req.responseText
            val objArray = JSON.parse<Array<Json>>(text)
            // build result table
            makeTable(objArray)
            // build filters
            makeFilters()
            productsArray += objArray
        } else {
            // filtering

            // remove all elements
            productsToShow = emptyArray()

            productsArray.forEach { product ->
                // if nothing is checked, retrieves every product
                if (checkedTM.isEmpty() && checkedStacks.isEmpty()) {
                    productsToShow += product
                } else {
                    var mkt = (product["targetMarket"] as Array<String>).joinToString(", ")
                    var stk = (product["stack"] as Array<String>).joinToString(", ")

                    if (checkedTM.isNotEmpty() && checkedTM in mkt) {
                        productsToShow += product
                    } else {
                        checkedStacks.forEach { checked ->
                            if (stk.contains(checked) && !productsToShow.contains(product)) {
                                productsToShow += product
                            }
                        }
                    }
                }
            }

            makeTable(productsToShow)
            loading(null)
        }
    }

    req.open("GET", url, true)
    req.send()
}

/**
 * Build search/filters mechanism
 * */
fun makeFilters() {
    targetMarketList.sort()
    stackList.sort()

    val radioGroup = document.getElementById("radio-group")
    val checkboxGroup1 = document.getElementById("checkbox-group1")
    val checkboxGroup2 = document.getElementById("checkbox-group2")

    targetMarketList.forEachIndexed { index, market ->
        radioGroup?.innerHTML += """
            <div class='custom-control custom-radio'>
                <input type='radio' class='custom-control-input' id='iptTargetMarket_$index' name='iptTargetMarket' value='$market' />
                <label for="iptTargetMarket_$index" class='custom-control-label'>$market</label>
            </div>
        """
    }

    stackList.forEachIndexed { index, stack ->
        val element = """
            <div class='custom-control custom-checkbox'>
                <input type='checkbox' class='custom-control-input' id='iptStack_$index' name='iptStack' value='$stack' />
                <label for="iptStack_$index" class='custom-control-label'>$stack</label>
            </div>
        """

        if (index <= 7) {
            checkboxGroup1?.innerHTML += element
        } else {
            checkboxGroup2?.innerHTML += element
        }

    }
}

/**
 * Build the HTML table's elements based on all elements of readed JSON
 * */
fun makeTable(objArray: Array<Json>) {
    val tableTbody = document.getElementById("table_tbody")
    // remove all elements
    tableTbody?.innerHTML = ""

    objArray.forEach {
        val productName = it["productName"]
        val description = it["description"]
        var targetMarket = it["targetMarket"] as Array<String>
        var stack = it["stack"] as Array<String>

        tableTbody?.innerHTML += """<tr>
                                        <td>$productName</td>
                                        <td>$description</td>
                                        <td>${targetMarket.joinToString(", ")}</td>
                                        <td>${stack.joinToString(", ")}</td>
                                    </tr>"""

        targetMarket.forEach { t ->
            if (!targetMarketList.contains(t)) targetMarketList.add(t)
        }

        stack.forEach { s ->
            if (!stackList.contains(s)) stackList.add(s)
        }
    }
}

/**
 * Remove selection of elements when cleaning filters
 * */
fun removeChecked(targetMarket: NodeList, stack: NodeList) {
    targetMarket.forEach { it -> (it as HTMLInputElement).checked = false }
    stack.forEach { it -> (it as HTMLInputElement).checked = false }
}

/**
 * Function to sanitize strings in the URL and make it RESTful
 * */
fun sanitizeUrl(targetMarket: String, stack: MutableList<String>): String {
    var strTargetMarket = targetMarket.replace("\\s".toRegex(), "+")
    var strStack = stack.joinToString(",").replace("\\s".toRegex(), "+")
    return "http://localhost:8080/api/products/targetMarket=$strTargetMarket&stack=$strStack"
}

/**
 * Custom implementation of 'forEach' method to handle NodeList
 * */
fun NodeList.forEach(action: (Node?) -> Unit) {
    (0 until this.length)
            .asSequence()
            .map { this.item(it) }
            .forEach { action(it) }
}

/**
 * Render a CSS loading element on clicked button
 * */
external fun loading(element: Element?)