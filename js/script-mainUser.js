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

function loadBartenderMenu (){
    var user = sessionStorage.getItem('user');
    for(var i=0; i<adminArray.length; i++){
        if(user == adminArray[i]){
            //SPRÅk
            var link = ("<a href='../html/bartenderIndex.html'><span key='bartenderLink' class='lang'>" + langArray[sessionStorage.getItem('sessionLanguage')]['bartenderLink'] + "</span></a>");
            document.getElementById("insertBartender").innerHTML = link;
            return;
        }
    }
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
    console.log(elements);
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
/**
 * Depending on if the element is dropped or just added with the add button
 * the information is set up in the same way so that the undo - redo functinality is easier controlled
 * and the quantity for the beer chosen is updated +1
 * */
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
            //boughtBeer.quantity+=1;
            updateView(shoppingCartList);
            undo.push(add);
            redo= [];
            return;
        }
    }
    boughtBeer.quantity+=1;
    shoppingCartList.push(boughtBeer);
    updateView(shoppingCartList);
    undo.push(add);
    redo=[];
}


/**
 * removes items from the cart depending on which element is selected.
 * */
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
    //var index =-1;
    for(var i = 0; i<shoppingCartList.length; i++){
        if(shoppingCartList[i].beer_id == boughtBeer.beer_id){
            shoppingCartList[i].quantity-=1;

            var remove ={
                action:"remove",
                obj:shoppingCartList[i]
            }
            //boughtBeer.quantity-=1;
            undo.push(remove);
            redo=[];
            if(shoppingCartList[i].quantity <= 0){
                shoppingCartList.splice(i,1);
            }
        }
        updateView(shoppingCartList);
    }
}


/**
 * Updates the view of the shoppingcart.
 * */
function updateView(shoppingCartList){
    var lang = sessionStorage.getItem("sessionLanguage");
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
    buyingBeer +="</li></ul><span class='totalSum'><span key='totalSum' class='lang'>" + langArray[lang]['totalSum'] +"</span>"+ sum +" SEK</span>"
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
/**
 *  Undo- functionality. If the action in the undo array was add an remove from cart action will occur.
 * */
function undoButton(){
    if (undo.length > 0) {
        var actionToUndo = undo.pop();
        if(actionToUndo.action == "add"){
            //console.log("add " + JSON.stringify(undo));
            var redoBackup = redo;
            removeFromCart('undo',actionToUndo.obj);
            redo = redoBackup;
            redo.push(actionToUndo);
            console.log(JSON.stringify(undo.pop()));

        }else{

            var redoBackup = redo;
            addMain('drop',actionToUndo.obj);
            redo = redoBackup;
            redo.push(actionToUndo);
            console.log(JSON.stringify(undo.pop()));
        }
    }
}

/**
 * Redos the latest action in the redo array
 * */

function redoButton(){
    if (redo.length > 0) {
        var actionToRedo = redo.pop();
        undo.push(actionToRedo);
        if(actionToRedo.action == "add"){
            var redoBackup = redo;
            addCart(actionToRedo.obj);
            undo.pop();
            redo=redoBackup;
        }else{
            //if remove
            var redoBackup = redo;
            removeFromCart('redo',actionToRedo.obj);
            undo.pop();
            redo = redoBackup;
        }
    }
}

$(document).ready(function() {
/**
 * The selected beer is bought when the buy button is pressed.
 * */
    $("#buyButton").click(function(){
        var userlog = sessionStorage.getItem('user');
        if(userlog != null) {
            if (shoppingCartList.length != 0) {
                for (var i = 0; i < shoppingCartList.length; i++) {
                    for (var j = 0; j < shoppingCartList[i].quantity; j++) {
                        console.log(shoppingCartList[i].beer_id);
                    }
                    $.ajax({
                        type: "GET",
                        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + sessionStorage.getItem('user') +
                        "&password=" + sessionStorage.getItem('pass') + "&action=purchases_append&beer_id=" + shoppingCartList[i].beer_id,
                        //http://pub.jamaica-inn.net/fpdb/api.php?username=gollan&password=gollan&action=purchases_append&=beer_id=157503
                        async: true,
                        datatype: 'json',
                        success: function (text) {
                            shoppingCartList=[];
                            updateView(shoppingCartList);
                            $("#boughtSuccess").fadeIn(0);
                            $("#boughtSuccess").delay(4500).fadeOut(1000);
                            console.log("bought");
                        }
                    });
                }

            } else {
                $("#noBeersSelected").fadeIn(0);
                $("#noBeersSelected").delay(4616).fadeOut(1000);
            }

            $.ajax({
                type: "GET",
                url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + sessionStorage.getItem('user') + "&password=" + sessionStorage.getItem('pass') + "&action=iou_get",
                async: true,
                success: function (data) {
                    sessionStorage.setItem('assets', data.payload[0]["assets"]);

                    var inserts = "<span key='assetsInfo'' class='lang'>" + langArray[sessionStorage.getItem('sessionLanguage')]['assetsInfo'] + "</span>";
                    inserts += sessionStorage.getItem('assets');
                    document.getElementById("assetsInfoLi").innerHTML = inserts;
                }

            });
        }else{
            $("#notLoggedIn").fadeIn(0);
            $("#notLoggedIn").delay(4500).fadeOut(1000);
        }
    });

    $("#search-criteria").keyup(function(){
        var g = $(this).val().toLowerCase();
        $(".beerItem .shopName").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.beerItem')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
        });
    });

    var userlog = sessionStorage.getItem('user');
    if(userlog != null){
        $('#loginli').hide();
    }else {
        $('#logoutli').hide();
    }

});


/*
* xmlhttprequest is an api to transfer any data from and to clint/server
* onreadystatechange property contains the eventhandler to be called when thereadystatechange event is fired, readystate 4 = done, status 200 =succesfull request
* xhttp.responsetext is a string that contains the response,  payload is a property that contains the information
* */

function loadMoreInfo(beer_id){
    var alco;
    var request = $.ajax({ type: "GET",
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id="+beer_id,
        async: true,
        success : function(text)
        {
            response = text;
            alco = response.payload[0].alkoholhalt;
            var fake= document.getElementById(beer_id).innerHTML;
            var pro = fake.replace("</b>","<br>" +alco+"</b>");
            document.getElementById(beer_id).innerHTML =pro;
        }

    });
    //console.log("assadASDDASD");
}
/**
 * Loads the information of the beers to the site
 * */
function loadItems() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var beers = JSON.parse(xhttp.responseText).payload;
            var lang = sessionStorage.getItem("sessionLanguage");
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
                    "</b></span><span class='price'><span key='price' class='lang'>"+ langArray[lang]['price'] + "</span> "
                    + beers[i]["pub_price"] +
                    " SEK </span></li>" );
                    loadMoreInfo(beers[i]["beer_id"]);
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
var theme = sessionStorage.getItem('themeCounter');
if(theme ==1){
    $(".stylee").css({"background-color":"#CEF0EF"});
}else{
    $(".stylee").css({"background-color":"#F6F6F6"})};

