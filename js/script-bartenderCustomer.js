function getPaymentsUser(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://pub.jamaica-inn.net/fpdb/api.php?username=hirchr&password=hirchr&action=payments_get_all", true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var orderTempList = JSON.parse(xhttp.responseText).payload;
            $( ".orderList" ).remove();
            var i;
            var orders = ("");
            for (i = 0; i < orderTempList.length; i++) {
                orders += ("<ul class='orderList' id='order" + i + "'>");
                orders += ("<li>User: " + orderTempList[i]["first_name"] + " " +  orderTempList[i]["last_name"] + " (" + orderTempList[i]["username"] + ")</li>");
                orders += ("<li>Cashier: " + orderTempList[i]["admin_username"] + "</li>");
                orders += ("<li>Amount: " + orderTempList[i]["amount"] + "</li>");
                orders += ("<li> Timestamp: " + orderTempList[i]["timestamp"] + "</li></ul>")

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
                };


                customerTempList += ("<li class='customerInfoElement' id='" + i +"'>");
                customerTempList += ("<p>Name: " + customer[i]["first_name"] + " " + customer[i]["last_name"] + "<button onclick='editCustomer(" + i + ")'> Edit</button></p>");
                customerTempList += ("<p class='username''>Username: " + customer[i]["username"]);
                customerTempList += ("<button onclick='viewOrders(" + i + ")'>Orders</button></p></li>");


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

            var i;
            var elements = ("<button id='lightButton' onclick='closeDiv()'>Cancel</button><div id ='temp'>");
            var leftBox = ("<div class ='leftBoxOrders'><p>Orders</p>");
            var rightBox = ("<div class ='rightBoxOrders'><p>Payments (" + assets + ")</p>");
            for (i = 0; i < orderTempList.length; i++) {
                if (orderTempList[i]["username"] == customerList[id].username) {
                    leftBox += ("<ul><li>" + orderTempList[i]["namn"] + orderTempList[i]["namn2"] + "</li>");
                    leftBox += ("<li>Price: " + orderTempList[i]["price"] + "</li>");
                    leftBox += ("<li> Timestamp: " + orderTempList[i]["timestamp"] + "</li>")
                    leftBox += ("<li> Transaction ID: " + orderTempList[i]["transaction_id"] + "</li></ul>");
                }
            }

            i = 0;
            for(i; i < paymentList.length; i++){
                if(paymentList[i].user ==  customerList[id].username){
                    rightBox += ("<ul><li>Amount: " + paymentList[i].amount + "</li>");
                    rightBox += ("<li>Cashier : " + paymentList[i].admin + "</li>");
                    rightBox += ("<li> Timestamp: " + paymentList[i].time + "</li></ul>")

                }
            }

            leftBox  += ("</div>" + rightBox + "");
            leftBox  += ("<ul><li><input type='text' id='inputAmount' value='0'></li><li><button onclick='addFunds(" + id + ")'>Add funds</button></li></ul></div>");
            elements += leftBox + "</div>";
            document.getElementById("lightEdit").innerHTML = elements;
            document.getElementById('lightEdit').style.display='block';document.getElementById('fadeEdit').style.display='block';
        }
    };
    xhttp.send();
}

function addFunds(id){
    var amount = document.getElementById("inputAmount").value;
    var tempUrl = ("http://pub.jamaica-inn.net/fpdb/api.php?username=hirchr&password=hirchr&action=payments_append&user_id=");

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

    var elements = ("<button id='lightButton' onclick='closeDiv()'>Cancel</button><div id ='temp'>");
    elements += ("<ul> <li>First Name:<input type='text' id='customerFName' value='" + customerList[id].fName + "'></li>");
    elements += ("<li>Last Name:<input type='text' id='customerLName' value='" +  customerList[id].lName + "'></li>");
    elements += ("</li><li>Username<input type='text' id='customerUsername' value='" +  customerList[id].username + "' readonly></li>");
    elements += ("<li>Email:<input type='text' id='customerEmail' value='Unavailable' readonly></li>");
    elements += ("<li>Telephone:<input type='text' id='customerTele' value='Unavailable' readonly></li></ul>");
    elements += ("<button onclick='confirmEditCustomer(" +  customerList[id].id +  ")'>Confirm Edit</button></form></div>");

    document.getElementById("lightEdit").innerHTML = elements;
    document.getElementById('lightEdit').style.display='block';document.getElementById('fadeEdit').style.display='block';

}

function confirmEditCustomer(id){
    customer = findCustomer(id);

    /*
    var tempUrl = ("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=user_edit&");
    tempUrl += ("new_username=" + customer.username + new_password);
    tempUrl += (id + "&amount=" + amount + "&price=" + price)

    */
    //RELOAD ALL INFO, GLÖM EJ NOLLSTÄLLA CUSTOMER LIST

    alert("TBI");

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