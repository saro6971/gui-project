/**
 * Created by Sam on 2016-02-05.
 */

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function loadItems() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var beers = JSON.parse(xhttp.responseText).payload;
           //document.getElementById("beer").innerHTML = JSON.stringify(beers);
           // console.log(JSON.stringify(beers));
            var i;
            var beerList = ("<div><ul id='beerListId'>");
            for (i=0; i < beers.length; i++){
                if (beers[i]["namn"] != ""){
                    beerList += ("<div class='beerItem' ><li><a href='http://www.google.se'>" + beers[i]["namn"]  + "<div id='priceId'> Price: " + beers[i]["pub_price"] + " £ </div></a></li></div>" );
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("beer").innerHTML = beerList;


        }
    };
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", true);
    xhttp.send();


}

loadItems();


