function logOutMe(){
    window.alert("Du kan föfan inte logga ut");
}

function clickBeer() {
    window.alert("Du har tryckt på BÄRKA");
}

function clickBeerInfo() {
    removeElementById("singleBoxOneID");
    removeElementById("fourBoxID");
    removeElementById("singleBoxTwoID");
}

function clickCustomer() {
    window.alert("Du har tryckt på kunder");
}

function clickTables() {
    window.alert("Du har tryckt på Bord");
}

function clickSaleInfo() {
    window.alert("Du har tryckt på säljinfo");

}

function orderMoreBeer(id ){
    var order = prompt("Please choose amount (20+)", "50");

    if (order != null && !isNaN(order)){
        if (order < 21){
            window.alert("Please increase the amount");
        }
        else {
            window.alert("You have ordered (I teorin)" + order + " amount of beer with ID: " + id);
        }
    }
    else {
        window.alert("Incorrect input");
    }
}

function searchBar(){
    var inputName = document.forms["search"]["name"].value;
    var inputPrice = document.forms["search"]["price"].value;
    var inputAmount = document.forms["search"]["amount"].value;

     window.alert("Name: " + inputName + " Price: " + inputPrice + " Amount: " + inputAmount);
}

function removeElementById(id){
    document.getElementById("" + id + "").remove();
}

function reloadNotification(){
    document.getElementById("ulList").remove();
    loadNotifications();

}

function loadNotifications() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var beers = JSON.parse(xhttp.responseText).payload;
            var i;
            var beerList = ("<div ><ul id = 'ulList'><li onClick='reloadNotification()'><b>Uppdatera</b></li>");
            for (i=0; i < beers.length; i++){
                if (beers[i]["namn"] != "" && beers[i]["count"] < 10){
                    beerList += ("<li id ="+ beers[i]["beer_id"] + ">" +
                    beers[i]["namn"] + " är snart slut. Finns just nu <b>" + beers[i]["count"] + "</b> i lager." +
                    "<a onClick='orderMoreBeer(" + beers[i]["beer_id"] + ")'> <b><u>Beställ mer.</u></b></a><a onClick='removeElementById(" + beers[i]["beer_id"] + ")'> <u>Ta bort notis</u></a></li>" );
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("notifications").innerHTML = beerList;
        }
    };
    xhttp.send();
}

function loadBeerInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var beers = JSON.parse(xhttp.responseText).payload;
            var i;
            var beerList = ("<div ><ul id='beerListId'>");
            for (i=0; i < beers.length; i++){
                if (beers[i]["namn"] != ""){
                    beerList += ("<li id =" + beers[i]["beer_id"] + ">" + beers[i]["namn"] + " Price: " + beers[i]["pub_price"] + " kr. Amount: " + beers[i]["count"] +
                    " ID: " + beers[i]["beer_id"] + "</a></li>" );
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("beerInfoID").innerHTML = beerList;
        }
    };
    xhttp.send();
}
