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
        elements.push(element);
        index = elements.length-1;
    }
    ev.dataTransfer.setData("index", index);
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
    if(typeof element === "undefined"){ return;}
    var id = $(element).attr('id');
    // kolla vad det är för typ av sak du släpper
    var price = parseInt($('#'+ id +".beerItem").attr('p'));
    var name = $('#'+ id +".beerItem").attr('name');
    var quantity = parseInt($('#'+ id +".beerItem").attr('q'));
    var boughtBeer = {
        name: name,
        beer_id: id,
        price: price,
        quantity: quantity
    };
    addMain('drop',boughtBeer);
}

function addMain(from, obj){
    if(from ==='drop'){
        addCart(obj);
    }else if(from ==='button'){
        var beer = document.getElementById(parseInt(obj.id.substring(3)));
        var beer2 = 'bought'+obj.id.substring(3);
        var boughtBeer = {
            name: beer.getAttribute('name'),
            beer_id: beer.getAttribute('id'),
            price: parseInt(beer.getAttribute('p')),
            quantity: parseInt(document.getElementById(beer2).getAttribute('q'))
        };
        addCart(boughtBeer);
    }
}

function addCart(boughtBeer){
    var add = {
        action:"add",
        obj:boughtBeer
    };
    for(var item in shoppingCartList){
        if (shoppingCartList[item].beer_id == boughtBeer.beer_id){
            shoppingCartList[item].quantity +=1;
            console.log(boughtBeer.beer_id);
            updateView(shoppingCartList);
            undo.push(add);
            return;
        }
    }
    boughtBeer.quantity+=1;
    shoppingCartList.push(boughtBeer);
    updateView(shoppingCartList);
    undo.push(add);
}

function removeFromCart(from, obj){
    var boughtBeer;
    if(from ==='button'){
        var beer = document.getElementById(parseInt(obj.id.substring(6)));
        var beer2 = 'bought'+obj.id.substring(6);
         boughtBeer = {
            name: beer.getAttribute('name'),
            beer_id: beer.getAttribute('id'),
            price: parseInt(beer.getAttribute('p')),
            quantity: parseInt(document.getElementById(beer2).getAttribute('q'))
        };

    }else {
        boughtBeer=obj;
        }

    var remove ={
        action:"remove",
        obj:boughtBeer
    }
    var index =-1;
    for(var i = 0; i<shoppingCartList.length; i++){
        if(shoppingCartList[i].beer_id == boughtBeer.beer_id){
            shoppingCartList[i].quantity-=1;
            undo.push(remove);
            if(shoppingCartList[i].quantity == 0){
                shoppingCartList.splice(i,1);
            }
        }
        updateView(shoppingCartList);
    }
}



function updateView(shoppingCartList){
    var buyingBeer ="<ul class='shopList'>";
    for(var item in shoppingCartList){
        buyingBeer += "<li class='boughtBeer' id=" +'bought'+ shoppingCartList[item].beer_id +" q="+shoppingCartList[item].quantity+" draggable='false' ><span class='shopName'><b>";
        buyingBeer += shoppingCartList[item].name;
        buyingBeer += "</b></span><span class='price'>"
        buyingBeer += shoppingCartList[item].quantity;
        buyingBeer += " x "+ shoppingCartList[item].price +" = " + shoppingCartList[item].price *shoppingCartList[item].quantity +" SEK";
        buyingBeer += "</span>   <button class='deleteButton' id=" +'delete' + shoppingCartList[item].beer_id +" type='button' onclick=\"removeFromCart('button',this)\" ><b>-</b></button>" +
                                "<button class='addButton' id=" +'add' + shoppingCartList[item].beer_id +" type='button' onclick=\"addMain('button',this)\" ><b>+</b></button>";
      }
    var sum = totalSum();
    buyingBeer +="</li></ul><span class='totalSum'>Total sum: "+ sum +" SEK</span>"
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

function clearButton(){
    shoppingCartList=[];
    updateView(shoppingCartList);
    undo =[];
    redo=[];
}

function undoButton(){
    var actionToUndo = undo.pop();
    if(actionToUndo.action == "add"){
        //console.log("add " + JSON.stringify(undo));
        removeFromCart('undo',actionToUndo.obj);
        redo.push(actionToUndo);
        undo.pop();
    }else{
        //if remove
        //console.log("delete" + JSON.stringify(undo));
        actionToUndo.obj.quantity-=1;
        addMain('drop',actionToUndo.obj);
        redo.push(actionToUndo);
        undo.pop();
    }
}

function redoButton(){
    var actionToRedo = redo.pop();
    if(actionToRedo.action == "add"){
        addCart(actionToRedo.obj);
    }else{
        //if remove
        removeFromCart('redo',actionToRedo.obj);
    }
}



$(document).ready(function() {

    $("#buyButton").click(function(){
        if(shoppingCartList.length != 0){

        }else{
            alert("TOM");
        }

    });

    $("#search-criteria").keyup(function(){
        var g = $(this).val().toLowerCase();
        $(".beerItem .shopName").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.beerItem')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
        });
    });

});
    /*
$("#search-criteria").keyup(function(){
    console.log("asd");
    var g = $(this).val().toLowerCase();
    $(".beerItem .shopName").each(function() {
        var s = $(this).text().toLowerCase();
        $(this).closest('.beerItem')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
    });
});
*/


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
                    + " class='beerItem' draggable='true' ondragstart='drag(this,event)' ><span class='shopName'><b>"
                    + beers[i]["namn"] +" "+beers[i]["namn2"]+
                    "</b></span><span class='price'>  "   +
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
//initiate keeping track of shopping, undo, redo
var shoppingCartList = [];
var undo = [];
var redo = [];
loadItems();
