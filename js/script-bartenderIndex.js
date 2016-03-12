function orderBeerNotification(id ){
    var order = prompt("Please choose amount (20+)", "50");

    if (order != null && !isNaN(order)){
        if (order < 21){
            window.alert("Please increase the amount");
        }
        else {
            window.alert("You have ordered" + order + " amount of beer with ID: " + id);
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
            var language = sessionStorage.getItem("sessionLanguage");
            var beers = JSON.parse(xhttp.responseText).payload;
            var i;
            var beerList = ("<div ><ul id = 'ulList'><li onClick='reloadNotification()' id='indexAlignMid'><b key='update' class='lang'>");
            beerList += (langArray[language]['update'] + "</b></li>");

            for (i=0; i < beers.length; i++){
                if (beers[i]["namn"] != "" && beers[i]["count"] < 10){
                    beerList += ("<li id ="+ beers[i]["beer_id"] + ">" + beers[i]["namn"]);
                    beerList += ("<span key='indexText1' class='lang'> " + langArray[language]['indexText1'] + " </span> <b>" + beers[i]["count"] + " </b>");
                    beerList += ("<span key='indexText2' class='lang'>" + langArray[language]['indexText2'] + "</span>");
                    beerList += ("<a onClick='orderBeerNotification(" + beers[i]["beer_id"] + ")'> <b key='orderMoreIndex' class='lang'>");
                    beerList += (langArray[language]['orderIndex'] +"</b></a><a onClick='removeElementById(" + beers[i]["beer_id"]);
                    beerList += (")' id='removeIndexText' ><span key='removeIndex' class='lang'> " + langArray[language]['removeIndex'] + "</span></a></li>" );
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("notifications").innerHTML = beerList;
        }
    };
    xhttp.send();
}

/*
#30 var beerList = ("<div ><ul id = 'ulList'><li onClick='reloadNotification()'><b id='update'>Uppdatera</b></li>");
#34 beerList += ("<span id='indexText1'>är snart slut. Finns just nu </span> <b>" + beers[i]["count"] + "</b> i lager.");
#35 beerList += ("<a onClick='orderBeerNotification(" + beers[i]["beer_id"] + ")'> <b><u>Beställ mer.</u></b></a>");
#36 beerList += ("<a onClick='removeElementById(" + beers[i]["beer_id"] + ")'><span></span> Ta bort notis</a></li>" );
 */