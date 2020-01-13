if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'app'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'app'.");
}
var app = function (_, Kotlin) {
  'use strict';
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Unit = Kotlin.kotlin.Unit;
  var String_0 = String;
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var joinToString = Kotlin.kotlin.collections.joinToString_cgipc5$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var contains_0 = Kotlin.kotlin.collections.contains_mjy6jw$;
  var sort = Kotlin.kotlin.collections.sort_4wi501$;
  var toString = Kotlin.toString;
  var joinToString_0 = Kotlin.kotlin.collections.joinToString_fmv235$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var asSequence = Kotlin.kotlin.collections.asSequence_7wnvza$;
  var map = Kotlin.kotlin.sequences.map_z5avom$;
  var productsArray;
  var targetMarketList;
  var stackList;
  var productsToShow;
  function main$lambda$lambda(closure$btnSearch, closure$iptTargetMarket, closure$iptStack) {
    return function (event) {
      loading(closure$btnSearch);
      fetch(false, closure$iptTargetMarket.v, closure$iptStack.v);
    };
  }
  function main$lambda$lambda_0(closure$btnClear, closure$iptTargetMarket, closure$iptStack) {
    return function (event) {
      loading(closure$btnClear);
      removeChecked(closure$iptTargetMarket.v, closure$iptStack.v);
      fetch(false, null, null);
    };
  }
  function main$lambda(it) {
    fetch(true, null, null);
    var iptTargetMarket = {v: document.getElementsByName('iptTargetMarket')};
    var iptStack = {v: document.getElementsByName('iptStack')};
    var btnSearch = document.getElementById('btnSearch');
    var btnClear = document.getElementById('btnClear');
    btnSearch != null ? (btnSearch.addEventListener('click', main$lambda$lambda(btnSearch, iptTargetMarket, iptStack)), Unit) : null;
    return btnClear != null ? (btnClear.addEventListener('click', main$lambda$lambda_0(btnClear, iptTargetMarket, iptStack)), Unit) : null;
  }
  function main(args) {
    window.onload = main$lambda;
  }
  function fetch$lambda(closure$checkedTM) {
    return function (tm) {
      var tmp$;
      var temp = Kotlin.isType(tmp$ = tm, HTMLInputElement) ? tmp$ : throwCCE();
      if (temp.checked) {
        closure$checkedTM.v = temp.value;
      }
      return Unit;
    };
  }
  function fetch$lambda_0(closure$checkedStacks) {
    return function (s) {
      var tmp$;
      var ipt = Kotlin.isType(tmp$ = s, HTMLInputElement) ? tmp$ : throwCCE();
      if (ipt.checked) {
        closure$checkedStacks.v.add_11rb$(ipt.value);
      }
      return Unit;
    };
  }
  var addAll = Kotlin.kotlin.collections.addAll_ye1y7v$;
  function fetch$lambda_1(closure$init, closure$req, closure$checkedTM, closure$checkedStacks) {
    return function (event) {
      if (closure$init === true) {
        var text = closure$req.responseText;
        var objArray = JSON.parse(text);
        buildTable(objArray);
        makeFilters();
        addAll(productsArray, objArray);
      }
       else {
        productsToShow = [];
        var $receiver = productsArray;
        var tmp$;
        tmp$ = $receiver.iterator();
        while (tmp$.hasNext()) {
          var element = tmp$.next();
          var closure$checkedTM_0 = closure$checkedTM;
          var closure$checkedStacks_0 = closure$checkedStacks;
          var tmp$_0, tmp$_1;
          if (closure$checkedTM_0.v.length === 0 && closure$checkedStacks_0.v.isEmpty()) {
            productsToShow = productsToShow.concat([element]);
          }
           else {
            var mkt = joinToString(Kotlin.isArray(tmp$_0 = element['targetMarket']) ? tmp$_0 : throwCCE(), ', ');
            var stk = {v: joinToString(Kotlin.isArray(tmp$_1 = element['stack']) ? tmp$_1 : throwCCE(), ', ')};
            if (closure$checkedTM_0.v.length > 0 && contains(mkt, closure$checkedTM_0.v)) {
              productsToShow = productsToShow.concat([element]);
            }
             else {
              var tmp$_2;
              tmp$_2 = closure$checkedStacks_0.v.iterator();
              while (tmp$_2.hasNext()) {
                var element_0 = tmp$_2.next();
                if (contains(stk.v, element_0) && !contains_0(productsToShow, element)) {
                  productsToShow = productsToShow.concat([element]);
                }
              }
            }
          }
        }
        buildTable(productsToShow);
        loading(null);
      }
    };
  }
  function fetch(init, targetMarket, stack) {
    var checkedTM = {v: new String_0()};
    var checkedStacks = {v: ArrayList_init()};
    targetMarket != null ? (forEach(targetMarket, fetch$lambda(checkedTM)), Unit) : null;
    stack != null ? (forEach(stack, fetch$lambda_0(checkedStacks)), Unit) : null;
    var url = sanitizeUrl(checkedTM.v, checkedStacks.v);
    println('URL invoked: ' + url);
    var req = new XMLHttpRequest();
    req.onloadend = fetch$lambda_1(init, req, checkedTM, checkedStacks);
    req.open('GET', url, true);
    req.send();
  }
  var checkIndexOverflow = Kotlin.kotlin.collections.checkIndexOverflow_za3lpa$;
  function makeFilters() {
    sort(targetMarketList);
    sort(stackList);
    var radioGroup = document.getElementById('radio-group');
    var checkboxGroup1 = document.getElementById('checkbox-group1');
    var checkboxGroup2 = document.getElementById('checkbox-group2');
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = targetMarketList.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var index_0 = checkIndexOverflow((tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0));
      radioGroup != null ? (radioGroup.innerHTML = (radioGroup != null ? radioGroup.innerHTML : null) + ('\n' + "            <div class='custom-control custom-radio'>" + '\n' + "                <input type='radio' class='custom-control-input' id='iptTargetMarket_" + index_0 + "' name='iptTargetMarket' value='" + item + "' />" + '\n' + '                <label for=' + '"' + 'iptTargetMarket_' + index_0 + '"' + " class='custom-control-label'>" + item + '<\/label>' + '\n' + '            <\/div>' + '\n' + '        ')) : null;
    }
    var tmp$_1, tmp$_0_0;
    var index_1 = 0;
    tmp$_1 = stackList.iterator();
    while (tmp$_1.hasNext()) {
      var item_0 = tmp$_1.next();
      var index_2 = checkIndexOverflow((tmp$_0_0 = index_1, index_1 = tmp$_0_0 + 1 | 0, tmp$_0_0));
      var element = '\n' + "            <div class='custom-control custom-checkbox'>" + '\n' + "                <input type='checkbox' class='custom-control-input' id='iptStack_" + index_2 + "' name='iptStack' value='" + item_0 + "' />" + '\n' + '                <label for=' + '"' + 'iptStack_' + index_2 + '"' + " class='custom-control-label'>" + item_0 + '<\/label>' + '\n' + '            <\/div>' + '\n' + '        ';
      if (index_2 <= 7) {
        checkboxGroup1 != null ? (checkboxGroup1.innerHTML = (checkboxGroup1 != null ? checkboxGroup1.innerHTML : null) + element) : null;
      }
       else {
        checkboxGroup2 != null ? (checkboxGroup2.innerHTML = (checkboxGroup2 != null ? checkboxGroup2.innerHTML : null) + element) : null;
      }
    }
  }
  function buildTable(objArray) {
    var tableTbody = document.getElementById('table_tbody');
    tableTbody != null ? (tableTbody.innerHTML = '') : null;
    var tmp$;
    for (tmp$ = 0; tmp$ !== objArray.length; ++tmp$) {
      var element = objArray[tmp$];
      var tmp$_0, tmp$_1;
      var productName = element['productName'];
      var description = element['description'];
      var targetMarket = Kotlin.isArray(tmp$_0 = element['targetMarket']) ? tmp$_0 : throwCCE();
      var stack = Kotlin.isArray(tmp$_1 = element['stack']) ? tmp$_1 : throwCCE();
      tableTbody != null ? (tableTbody.innerHTML = (tableTbody != null ? tableTbody.innerHTML : null) + ('<tr>' + '\n' + '                                        <td>' + toString(productName) + '<\/td>' + '\n' + '                                        <td>' + toString(description) + '<\/td>' + '\n' + '                                        <td>' + joinToString(targetMarket, ', ') + '<\/td>' + '\n' + '                                        <td>' + joinToString(stack, ', ') + '<\/td>' + '\n' + '                                    <\/tr>')) : null;
      var tmp$_2;
      for (tmp$_2 = 0; tmp$_2 !== targetMarket.length; ++tmp$_2) {
        var element_0 = targetMarket[tmp$_2];
        if (!targetMarketList.contains_11rb$(element_0))
          targetMarketList.add_11rb$(element_0);
      }
      var tmp$_3;
      for (tmp$_3 = 0; tmp$_3 !== stack.length; ++tmp$_3) {
        var element_1 = stack[tmp$_3];
        if (!stackList.contains_11rb$(element_1))
          stackList.add_11rb$(element_1);
      }
    }
  }
  function removeChecked$lambda(it) {
    var tmp$;
    (Kotlin.isType(tmp$ = it, HTMLInputElement) ? tmp$ : throwCCE()).checked = false;
    return Unit;
  }
  function removeChecked$lambda_0(it) {
    var tmp$;
    (Kotlin.isType(tmp$ = it, HTMLInputElement) ? tmp$ : throwCCE()).checked = false;
    return Unit;
  }
  function removeChecked(targetMarket, stack) {
    forEach(targetMarket, removeChecked$lambda);
    forEach(stack, removeChecked$lambda_0);
  }
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  function sanitizeUrl(targetMarket, stack) {
    var strTargetMarket = Regex_init('\\s').replace_x2uqeu$(targetMarket, '+');
    var tmp$ = joinToString_0(stack, ',');
    var strStack = Regex_init('\\s').replace_x2uqeu$(tmp$, '+');
    return 'http://localhost:8080/api/products/targetMarket=' + strTargetMarket + '&stack=' + strStack;
  }
  function forEach$lambda(this$forEach) {
    return function (it) {
      return this$forEach.item(it);
    };
  }
  function forEach($receiver, action) {
    var tmp$;
    tmp$ = map(asSequence(until(0, $receiver.length)), forEach$lambda($receiver)).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      action(element);
    }
  }
  Object.defineProperty(_, 'productsArray', {
    get: function () {
      return productsArray;
    }
  });
  Object.defineProperty(_, 'targetMarketList', {
    get: function () {
      return targetMarketList;
    }
  });
  Object.defineProperty(_, 'stackList', {
    get: function () {
      return stackList;
    }
  });
  Object.defineProperty(_, 'productsToShow', {
    get: function () {
      return productsToShow;
    },
    set: function (value) {
      productsToShow = value;
    }
  });
  _.main_kand9s$ = main;
  _.fetch_h9kbm8$ = fetch;
  _.makeFilters = makeFilters;
  _.buildTable_xsyh3m$ = buildTable;
  _.removeChecked_oyxktw$ = removeChecked;
  _.sanitizeUrl_6rkr74$ = sanitizeUrl;
  _.forEach_k4xucj$ = forEach;
  productsArray = ArrayList_init();
  targetMarketList = ArrayList_init();
  stackList = ArrayList_init();
  productsToShow = [];
  main([]);
  Kotlin.defineModule('app', _);
  return _;
}(typeof app === 'undefined' ? {} : app, kotlin);

//# sourceMappingURL=app.js.map
