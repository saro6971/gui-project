/**
 * Created by Sam on 2016-03-08.
 */

var main = function(){
var loggedin=[];

    $('.dropdown-toggle').click(function(){
        $('.dropdown-menu').toggle();
    });



    $('#button-login').click(function(){
        var user = $("[name=username]").val();
        var pass = $("[name=password]").val();
        var response = '';
        $.ajax({ type: "GET",
            url: "http://pub.jamaica-inn.net/fpdb/api.php?username="+user+"&password="+pass+"&action=iou_get",
            async: true,
            datatype:'json',
            success : function(text)
            {
                response = text;
                if(response["type"] === "iou_get"){
                    var loggedInUser = {
                        userId: response.payload[0]["user_id"],
                        firstName: response.payload[0]["first_name"],
                        lastName: response.payload[0]["last_name"],
                        assets: response.payload[0]["assets"]
                    };
                    whoLoggedIn.push(loggedInUser);
                    console.log(whoLoggedIn);
                    var printed ="<span>Hello "+loggedInUser['firstName'] +"</span>"
                    console.log(printed);
                    document.getElementById("showName").innerHTML = printed;

                }
                else {
                    console.log("esa no working hombre");
                }
            }
        });
    });

    $('#button-cancel').click(function(){
        $('.dropdown-menu').toggle();
    });

};



$(document).ready(main);
var whoLoggedIn = [];