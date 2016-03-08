function orderBeerNotification(id ){
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
                    beerList += ("<li id ="+ beers[i]["beer_id"] + ">" + beers[i]["namn"] + " är snart slut. Finns just nu <b>" + beers[i]["count"] + "</b> i lager.");
                    beerList += ("<a onClick='orderBeerNotification(" + beers[i]["beer_id"] + ")'> <b><u>Beställ mer.</u></b></a>");
                    beerList += ("<a onClick='removeElementById(" + beers[i]["beer_id"] + ")'> <u>Ta bort notis</u></a></li>" );
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("notifications").innerHTML = beerList;
        }
    };
    xhttp.send();
}