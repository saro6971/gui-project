/**
 * Created by Sam on 2016-02-05.


$(document).ready(function () {
$(function(){
    $("#shoppingCart, #beerListId").sortable({
        connectWith: ".connect"
    }).disableSelection();
});
$(function(){
    $("#shoppingCart, #beerListId").sortable({
        connectWith: ".connect"
    }).disableSelection();
});

/*
/*
 * By default elements are not allowed to be dropped in other elements, preventDefault prevents this.
 */
function allowDrop(ev) {
    ev.preventDefault();
    console.log("ALLOW DROP");
}

/*
 * save the index of the element into index
 *
 * */

var elements = [];
function drag(element, ev) {
    var index = elements.indexOf(element);
    if(index == -1){
        // if not already in the array then we add it
        elements.push(element);
        index = elements.length-1;
    }
    ev.dataTransfer.setData("index", index);
    console.log(index);
}

/*
 * Prevent the default of dropping an element(open as a link)
 * Get the dragged data(getData()) method,
 * this will return any data that was set to the same type in the setData method.
 * The set data was the index of the dragged element
 * append the dragged element into the target element
 * */

function drop(target, ev) {
    ev.preventDefault();
    var element = elements[event.dataTransfer.getData('index')];
    //var pos = element.indexOf("Price")
    //console.log($(element).attr('id'));
    var id = $(element).attr('id');
    var price = $('#'+id+".beerItem a").html();
    var place = price.indexOf("Price: ");
    console.log(price);
    console.log(place);
    console.log(id);
    target.appendChild(element);
    /*var data = ev.dataTransfer.getData("text");
     console.log(data);
     ev.target.appendChild(document.getElementById(data));
     */
}

function addCart(id, price, quantity){
    //if id in shopping cart
    if(jQuery.inArray(id,shoppingCartList) !== -1){
        // If id exists, +1 on number of beers, -1 on quantity, att price to total.

    }
    else{
        // if id not in array, add new beer, +price on total, -1 quantity, number of beers = 1
    }
}

/*
* xmlhttprequest is an api to transfer any data from and to clint/server
* onreadystatechange property contains the eventhandler to be called when thereadystatechange event is fired, readystate 4 = done, status 200 =succesfull request
* xhttp.responsetext is a string that contains the response,  payload is a property that contains the information
* */



function loadItems() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var beers = JSON.parse(xhttp.responseText).payload;
            var i;
            var beerList = ("<div ><ul id='beerListId'>");
            for (i=0; i < beers.length; i++){
                if (beers[i]["namn"] != ""){
                    beerList += ("<li id ="+ beers[i]["beer_id" ] + " class='beerItem' draggable='true' ondragstart='drag(this,event)' >"+ beers[i]["namn"] +
                    "<a class='priceClass'>"   + " Price: " + beers[i]["pub_price"] + " £ </a></li>" );
                }
            }
            beerList += ("</ul></div>")
            document.getElementById("beer").innerHTML = beerList;
        }
    };
    xhttp.send();
}
//keeping track of shopping
var shoppingCartList = [];
loadItems();

/*});
*/