function getPaymentsUser(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=hirchr&password=hirchr&action=payments_get_all", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var orderTempList = JSON.parse(xhttp.responseText).payload;
            $( ".orderList" ).remove();
            //langArray[language]['lName']
            //var language = sessionStorage.getItem("sessionLanguage");

            var language = sessionStorage.getItem("sessionLanguage");
            var i;
            paymentList = [];
            var orders = ("");
            for (i = 0; i < orderTempList.length; i++) {
                orders += ("<ul class='orderList' id='order" + i + "'>");
                orders += ("<li><span key='user' class='lang'>" + langArray[language]['user'] + "</span>" + orderTempList[i]["first_name"] + " " +  orderTempList[i]["last_name"]);
                orders += ("(" + orderTempList[i]["username"] + ")</li>");
                orders += ("<li><span key='cashier' class='lang'>" + langArray[language]['cashier'] + "</span>" + orderTempList[i]["admin_username"] + "</li>");
                orders += ("<li><span key='amount' class='lang'>" + langArray[language]['amount'] + "</span>" + orderTempList[i]["amount"] + "</li>");
                orders += ("<li><span key='timestamp' class='lang'> " + langArray[language]['timestamp'] + "</span>" + orderTempList[i]["timestamp"] + "</li></ul>")

                var payments = {
                    user: orderTempList[i]["username"],
                    admin: orderTempList[i]["admin_username"] ,
                    amount: orderTempList[i]["amount"],
                    time: orderTempList[i]["timestamp"]
                }
                paymentList.push(payments);

            }
            document.getElementById("orderUl").innerHTML = orders;
        }
    };
    xhttp.send();
}
function loadCustomerList(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=iou_get_all", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var customer = JSON.parse(xhttp.responseText).payload;
            var i;
            var customerTempList = ("<div ><ul class = 'customerInfoUl'>");
            for (i=0; i < customer.length; i++){
                var customerTemp = {
                    fName: customer[i]["first_name"],
                    lName: customer[i]["last_name"],
                    username: customer[i]["username"],
                    email: 'dummy@mail.com',
                    phone: '+46709456671'
                };

                var language = sessionStorage.getItem("sessionLanguage");
                customerTempList += ("<li class='customerInfoElement' id='" + i +"'>");
                customerTempList += ("<p><span key='name' class='lang'>" + langArray[language]['name']);
                customerTempList += ("</span><span id='customerfName'>" + customer[i]["first_name"] + "</span> <span id='customerlName'>" + customer[i]["last_name"] + "</span>");
                customerTempList += ("</span><span id='customerfName" + i + "'>" + customer[i]["first_name"] + "</span> <span id='customerlName" + i + "'>" + customer[i]["last_name"] + "</span>");
                customerTempList += ("<button onclick='editCustomer(" + i + ")' key='edit' class='lang'>" + langArray[language]['edit'] + "</button></p>");
                customerTempList += ("<p class='username'><span key='user' class='lang'>" + langArray[language]['user'] + "</span> <span id='custUsername'>" + customer[i]["username"] + "</span>");
                customerTempList += ("<p class='username'><span key='user' class='lang'>" + langArray[language]['user'] + "</span> <span id='custUsername" + i + "'>" + customer[i]["username"] + "</span>");
                customerTempList += ("<button onclick='viewOrders(" + i + ")'><span key='orders' class='lang'>" + langArray[language]['orders'] + "</span></button></p></li>");


                customerList.push(customerTemp);
            }
            customerTempList += ("</ul></div>");
            document.getElementById("customerInfoId").innerHTML = customerTempList;
        }
    };
    xhttp.send();
}
function viewOrders(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=hirchr&password=hirchr&action=purchases_get_all", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var orderTempList = JSON.parse(xhttp.responseText).payload;
            $.ajax({
                type: 'GET',
                url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + customerList[id].username +'&password='+ customerList[id].username + "&action=iou_get",
                async: false,
                success: function (responds) {
                    assets = responds.payload[0].assets;

                },
                fail: function (){
                    alert("error");
                }
            });

            var language = sessionStorage.getItem("sessionLanguage");
            var i;
            var elements = ("<button id='lightButton' onclick='closeDiv()' key='cancel' class='lang'>" + langArray[language]['cancel'] + "</button><div id ='temp'>");
            var leftBox = ("<div class ='leftBoxOrders'><p key='orders' class='lang'>" + langArray[language]['orders'] + "</p>");
            var rightBox = ("<div class ='rightBoxOrders'><p><span key='payments' class='lang'>" + langArray[language]['payments'] + "</span>(" + assets + ")</p>");
            var rightBox = ("<div class ='rightBoxOrders'><p><span key='payments' class='lang'>" + langArray[language]['payments'] + "</span>(" + assets + " SEK)</p>");
            for (i = 0; i < orderTempList.length; i++) {
                if (orderTempList[i]["username"] == customerList[id].username) {
                    leftBox += ("<ul><li>" + orderTempList[i]["namn"] + orderTempList[i]["namn2"] + "</li>");
                    leftBox += ("<ul><li>" + orderTempList[i]["namn"] + " " + orderTempList[i]["namn2"] + "</li>");
                    leftBox += ("<li><span key='price' class='lang'>" + langArray[language]['price'] + "</span>" + orderTempList[i]["price"] + "</li>");
                    leftBox += ("<li> <span key='timestamp' class='lang'>" + langArray[language]['timestamp'] + "</span>" + orderTempList[i]["timestamp"] + "</li>")
                    leftBox += ("<li> <span key='transId' class='lang'>" + langArray[language]['transactionId'] + "</span>" + orderTempList[i]["transaction_id"] + "</li></ul>");
                }
            }

            i = 0;
            for(i; i < paymentList.length; i++){
                if(paymentList[i].user ==  customerList[id].username){
                    rightBox += ("<ul><li><span key='amount' class='lang'>" + langArray[language]['amount'] + "</span>" + paymentList[i].amount + "</li>");
                    rightBox += ("<li><span key='cashier' class='lang'>" + langArray[language]['cashier'] + "</span>" + paymentList[i].admin + "</li>");
                    rightBox += ("<li><span key='timestamp' class='lang'> " + langArray[language]['timestamp'] + "</span>" + paymentList[i].time + "</li></ul>")

                }
            }

            leftBox  += ("</div>" + rightBox + "");
            leftBox  += ("<ul><li><input type='text' id='inputAmount' value='0'></li>");
            leftBox  += ("<li><button onclick='addFunds(" + id + ")'><span key='funds' class='lang'>" + langArray[language]['funds'] + "</span></button></li></ul></div>");
            elements += leftBox + "</div>";
            document.getElementById("lightEdit").innerHTML = elements;
            document.getElementById('lightEdit').style.display='block';document.getElementById('fadeEdit').style.display='block';
        }
    };
    xhttp.send();
}
function addFunds(id){
    var amount = document.getElementById("inputAmount").value;
    var tempUrl = ("http://pub.jamaica-inn.net/fpdb/api.php?username=" + sessionStorage.getItem('user') +"&password=" + sessionStorage.getItem('user') +"&action=payments_append&user_id=");

    if(!isNaN(amount)){
        $.ajax({
            type: 'GET',
            url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + customerList[id].username  +'&password='+ customerList[id].username  + "&action=iou_get",
            async: false,
            success: function (responds) {
                var id = responds.payload[0].user_id;

                tempUrl += (id + "&amount=" + amount);
                tempUrl += ("24&amount=" + amount);
                $.ajax({
                    type: 'POST',
                    url: tempUrl,
                    async: false,
                    success: function () {

                        closeDiv();
                        //removeElementById("beerInfoRemove");
                        paymentList = [];
                        getPaymentsUser();
                    },
                    fail: function (){
                        alert("error");
                    }
                });

            },
            fail: function (){
                alert("error");
            }
        });
    }
}

function editCustomer(id){
    var language = sessionStorage.getItem("sessionLanguage");

    var elements = ("<button id='lightButton' onclick='closeDiv()' key='cancel' class='lang'>" + langArray[language]['cancel'] + "</button><div id ='temp'>");
    elements += ("<ul> <li><span key='fName' class='lang'>" + langArray[language]['fName'] + "</span><input type='text' id='customerFName' value='" + customerList[id].fName + "'></li>");
    elements += ("<li><span key='lName' class='lang'>" + langArray[language]['lName'] + "</span><input type='text' id='customerLName' value='" +  customerList[id].lName + "'></li>");
    elements += ("</li><li><span key='user' class='lang'>" + langArray[language]['user'] + "</span><input type='text' id='customerUsername' value='" +  customerList[id].username + "'></li>");
    elements += ("<li><span key='email' class='lang'>" + langArray[language]['email'] + "</span><input type='text' id='customerEmail' value='" + customerList[id].email + "'></li>");
    elements += ("<li><span key='phone' class='lang'>" + langArray[language]['phone'] + "</span><input type='text' id='customerTele' value='" + customerList[id].phone + "'></li>");
    elements += ("<button onclick='confirmEditCustomer(" +  id +  ")' key='confirm' class='lang'>Confirm Edit</button></form></div>");

    document.getElementById("lightEdit").innerHTML = elements;
    document.getElementById('lightEdit').style.display='block';document.getElementById('fadeEdit').style.display='block';

}

function confirmEditCustomer(id){
    customerList[id].fName =  document.getElementById("customerFName").value;
    customerList[id].lName = document.getElementById("customerLName").value;
    customerList[id].username = document.getElementById("customerUsername").value;
    customerList[id].email = document.getElementById("customerEmail").value;
    customerList[id].phone = document.getElementById("customerTele").value;

    $("#customerfName" + id).text(customerList[id].fName);
    $("#customerlName" + id).text(customerList[id].lName);
    $("#custUsername" + id).text(customerList[id].username);
    closeDiv();
}

$(document).ready(function() {
    $("#searchCustomer").keyup(function(){
        var g = $(this).val().toLowerCase();
        $(".customerInfoElement").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.customerInfoElement')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
        });
    });

});

var assets = 0;
var customerList = [];
var paymentList = [];