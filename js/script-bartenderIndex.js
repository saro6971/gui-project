
function orderBeerNotification(id ){
    var order = prompt("Please choose amount (10+)", "50");

    if (order != null && !isNaN(order)){
        if (order < 10){
            window.alert("Please increase the amount");
        }
        else {
            var beer = findInfoBeer2(id);
            beer.amount = parseInt(beer.amount) + parseInt(order);
            reloadNotificationAux(id,beer);
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
                    beerList += ("<span key='indexText1' class='lang'> " + langArray[language]['indexText1'] + " </span> <b id='beer" + beers[i]["beer_id"] + "'>" + beers[i]["count"] + " </b>");
                    beerList += ("<span key='indexText2' class='lang'>" + langArray[language]['indexText2'] + "</span>");
                    beerList += ("<a onClick='orderBeerNotification(" + beers[i]["beer_id"] + ")'> <b key='orderIndex' class='lang'>");
                    beerList += (langArray[language]['orderIndex'] +"</b></a><a onClick='removeElementById(" + beers[i]["beer_id"]);
                    beerList += (")' id='removeIndexText' ><span key='removeIndex' class='lang'> " + langArray[language]['removeIndex'] + "</span></a></li>" );

                    var temp = {
                        name1: beers[i]["namn"],
                        name2: beers[i]["namn2"],
                        id: beers[i]["beer_id"],
                        amount: beers[i]["count"],
                        price: beers[i]["price"]

                    };
                    //alert(temp.name1);
                    beerItemList2.push(temp);

                }
            }
            beerList += ("</ul></div>")
            document.getElementById("notifications").innerHTML = beerList;
        }
    };
    xhttp.send();
}

function reloadNotificationAux(id,item){
    if(item.amount < 20){
        document.getElementById("beer"+id).innerHTML = item.amount + " ";
    }
    else{
        removeElementById(id);
    }
}
var beerItemList2 = [];





