/**
 * Created by Sam on 2016-02-05.




 * By default elements are not allowed to be dropped in other elements, preventDefault prevents this.
 */
function allowDrop(ev) {
    ev.preventDefault();
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
   // console.log(index);
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
    var price = parseInt($('#'+ id +".beerItem").attr('p'));
    var name = $('#'+ id +".beerItem").attr('name');
    var quantity = parseInt($('#'+ id +".beerItem").attr('q'));
    var boughtBeer = {
        name: name,
        beer_id: id,
        price: price,
        quantity: quantity
    };
    addCart(boughtBeer);
    //target.appendChild(element);
    /*var data = ev.dataTransfer.getData("text");
     console.log(data);
     ev.target.appendChild(document.getElementById(data));
     */
}


function addCart(boughtBeer){
    for(var item in shoppingCartList){
        if (shoppingCartList[item].beer_id == boughtBeer.beer_id){
            //shoppingCartList[item].quantity -=1;
            shoppingCartList[item].quantity +=1;
            updateView(shoppingCartList);
            return;
        }
    }
    boughtBeer.quantity+=1;
    shoppingCartList.push(boughtBeer);
    updateView(shoppingCartList);
}

function removeFromCart(boughtBeer){
    var idBeer = parseInt(boughtBeer.id.substring(6));
    var index =-1;
    for(var i = 0; i<shoppingCartList.length; i++){
        if(shoppingCartList[i].beer_id == idBeer){
            shoppingCartList[i].quantity-=1;
            if(shoppingCartList[i].quantity == 0){
                shoppingCartList.splice(i,1);
            }
        }
        updateView(shoppingCartList);
    }
}

function addButtonCart(boughtBeer){
    var idBeer = parseInt(boughtBeer.id.substring(3));
    for(var item in shoppingCartList){
        if(shoppingCartList[item].beer_id == idBeer){
            shoppingCartList[item].quantity +=1;
        }
    }
    updateView(shoppingCartList);
}

function updateView(shoppingCartList){
    var buyingBeer ="<div><ul>";
    for(var item in shoppingCartList){
        buyingBeer += "<li class='boughtBeer' id=" +'bought'+ shoppingCartList[item].beer_id +" q="+shoppingCartList[item].quantity+" ><span class='shopName'><b>";
        buyingBeer += shoppingCartList[item].name;
        buyingBeer += "</b></span><span class='price'>"
        buyingBeer += shoppingCartList[item].quantity;
        buyingBeer += " x "+ shoppingCartList[item].price +" = " + shoppingCartList[item].price *shoppingCartList[item].quantity +" SEK";
        buyingBeer += "</span>   <button class='deleteButton' id=" +'delete' + shoppingCartList[item].beer_id +" type='button' onclick=\"removeFromCart(this)\" ><b>-</b></button>" +
                                "<button class='addButton' id=" +'add' + shoppingCartList[item].beer_id +" type='button' onclick=\"addButtonCart(this)\" ><b>+</b></button>";
      }
    var sum = totalSum();
    buyingBeer +="</li></ul></div><span class='totalSum'>Total sum: "+ sum +" SEK</span>"
    document.getElementById("shoppingCart").innerHTML = buyingBeer;
}

function totalSum(){
    var sum = 0;
    for(item in shoppingCartList){
        var tmpQuant = shoppingCartList[item].quantity;
        var tmpPrice = shoppingCartList[item].price;
        sum += tmpPrice * tmpQuant;
    }
    return sum;
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
                    beerList += ("<li id ="+ beers[i]["beer_id" ]
                    + " p=" + beers[i]['pub_price']
                    + " q=0"
                        // + " q="+beers[i]['count']
                    + " name=\""+beers[i]['namn'] +" "+ beers[i]['namn2'] + "\""
                    + " class='beerItem' draggable='true' ondragstart='drag(this,event)' ><span>"
                    + beers[i]["namn"] +" "+beers[i]["namn2"]+
                    "</span><span class='price'>  "   +
                    "  Price: "
                    + beers[i]["pub_price"] +
                    " SEK </span></li>" );
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
