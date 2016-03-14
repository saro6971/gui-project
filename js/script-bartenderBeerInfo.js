function loadBeerInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var beers = JSON.parse(xhttp.responseText).payload;
            var language = sessionStorage.getItem("sessionLanguage");
            var i;
            var beerList = ("<div id='beerInfoRemove'><ul class = 'beerInfoUl'>");
            for (i=0; i < beers.length; i++){
                if (beers[i]["namn"] != ""){
                    beerList += ("<li class='beerInfoElement' id='" + beers[i]["namn"] +"'><p>" + beers[i]["namn"] + " " + beers[i]["namn2"]);
                    beerList += ("<button onclick='editBeer(" + beers[i]["beer_id"] + ")' key='edit' class='lang'>" + langArray[language]['edit'] + "</button></p>");
                    beerList += ("<p class='price'><span key='amount' class='lang'>" + langArray[language]['amount'])
                    beerList += ("</span><span id='amount" + beers[i]["beer_id"] +"'>" + beers[i]["count"] + "</span> - ");
                    beerList += ("<span key='price' class='lang'>" + langArray[language]['price'] + "</span><span id='price" + beers[i]["beer_id"] +  "'>" +  beers[i]["price"]);
                    beerList += ("</span><button onclick='orderBeerDiv(" + beers[i]["beer_id"] + ")' key='order' class='lang'>" + langArray[language]['order'] + "</button></p></li>");

                    var beerItem = {
                        name1: beers[i]["namn"],
                        name2: beers[i]["namn2"],
                        id: beers[i]["beer_id"],
                        price: beers[i]["price"],
                        amount: beers[i]["count"]
                    };
                    beerItemList.push(beerItem);
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("beerInfoInfoID").innerHTML = beerList;
        }
    };
    xhttp.send();
}

function editBeer(id){
    var language = sessionStorage.getItem("sessionLanguage");
    var beer = findInfo(id);
    var elements = ("<div id ='temp'>");
    elements += ("<ul> <li>" + beer.name1 + " " + beer.name2 + "</li>");
    elements += ("<li>" + langArray[language]['amount'] + "<input type='text' id='beerInfoInputAmount' value='" + beer.amount + "'></li>");
    elements += ("<li>" + langArray[language]['price'] + "<input type='text' id='beerInfoInputPrice' value='" + beer.price + "'></li></ul>");
    elements += ("<button onclick='applyBeerEdit(" + beer.id +  ")'>" + langArray[language]['confirm']);
    elements += ("<button onclick ='closeDiv()'>" + langArray[language]['cancel'] + "</button></form></div>");

    document.getElementById("lightEdit").innerHTML = elements;
    document.getElementById('lightEdit').style.display='block';document.getElementById('fadeEdit').style.display='block';

}

function applyBeerEdit(id){
     var amount = document.getElementById("beerInfoInputAmount").value;
     var price = document.getElementById("beerInfoInputPrice").value;
    if(!isNaN(price) && !isNaN(amount)){
        editElements(id,price,amount);
        closeDiv();
    }
    else{
        alert("Wrong input");
    }
}

function orderBeerDiv(id){
    var beer = findInfo(id);
    var language = sessionStorage.getItem("sessionLanguage");

    var elements = ("<div id ='temp2'>");
    elements += ("<ul> <li>" + beer.name1 + beer.nam2 + "</li><li>" + langArray[language]['inStock'] + beer.amount + "</li>");
    elements += ("<li>" + langArray[language]['amountOrder'] + "<input type='text' id='beerOrderDiv' value='0' ></li></ul>");
    elements += ("<button name='orderSubmit'onclick='orderBeer(" + beer.id +  " )'>" + langArray[language]['order'] + "</button><button onclick ='closeDiv()'>Cancel</button></div>");

    document.getElementById("lightOrder").innerHTML = elements;
    document.getElementById('lightOrder').style.display='block';document.getElementById('fadeOrder').style.display='block';
}

function orderBeer(id) {
    var language = sessionStorage.getItem("sessionLanguage");
    var beer = findInfo(id);
    var amount = document.getElementById("beerOrderDiv").value;

    if(amount > 0 && amount[0] != 0){
        var orders = ("<ul class='orderList' id='order" + beer.id + "'> <li>" + beer.name1 + " " + beer.name2 + "<div id='cancel' onclick='removeOrder(" + beer.id + ")'>X</div></li>");
        orders += ("<li><span key='purchaseAmount' class='lang'>" + langArray[language]['purchaseAmount'] + "</span>" + amount + "</li></ul>")

        var orderObject = {
            id: id,
            amount: amount
        }

        orderList.push(orderObject);

        $( "#orderUl" ).append(orders);
        closeDiv();
    }
    else {
        window.alert("Order more")
    }
}

function confirmOrder(){
    if(orderList.length == 0){
        //alert("Empty")

    }
    else{
        for(var i = 0; i < orderList.length;i++){
            var id = orderList[i].id;
            var beer = findInfo(id);
            var newAmount = parseInt(beer.amount) + parseInt(orderList[i].amount);
            beer.amount = newAmount;

            document.getElementById("amount" + id).innerHTML = (newAmount).toString();

        }


        orderList = [];
        $( ".orderList" ).remove();
    }
}

function removeOrder(id){
    for(var item in orderList){
        if(id == orderList[item].id){
            orderList.splice(item,1);
            removeElementById("order" + id);
            return;
        }
    }

}

function editElements(id,price,amount){
    var beer = findInfo(id);

    beer.price = price;
    document.getElementById("price" + id).innerHTML = price;

    beer.amount = amount;
    document.getElementById("amount" + id).innerHTML = amount;
}

$(document).ready(function() {
    $("#searchBarName").keyup(function(){

        var g = $(this).val().toLowerCase();

        $(".beerInfoElement").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.beerInfoElement')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
        });
    });


});
var beerItemList = [];
var orderList = [];
