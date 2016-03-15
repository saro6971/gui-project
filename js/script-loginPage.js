/**
 * Created by Sam on 2016-03-08.
 */

var main = function(){
    var lang = sessionStorage.getItem("sessionLanguage");
    var firstName = sessionStorage.getItem('firstname');
    var lastName = sessionStorage.getItem('lastname');
    var userId = sessionStorage.getItem('userid');
    var asset = sessionStorage.getItem('assets');
    if(firstName != null){
        var printed ="<span key='welcome' class='lang'> "+ langArray[lang]['welcome'] +"</span>"+sessionStorage.getItem('firstname'); +""
        document.getElementById("showName").innerHTML = printed;
    }




    $('.dropdown-toggle').click(function(){
        $('.dropdown-menu').toggle();
    });



    $('#button-login').click(function(event){
        event.preventDefault();
        var user = $("[name=username]").val();
        sessionStorage.setItem('user',user);
        var pass = $("[name=password]").val();
        sessionStorage.setItem('pass',pass);
        var response = '';
        var lang = sessionStorage.getItem("sessionLanguage");

        var request = $.ajax({ type: "GET",
            url: "http://pub.jamaica-inn.net/fpdb/api.php?username="+user+"&password="+pass+"&action=iou_get",
            async: true,
            success : function(text)
            {
                response = text;
                if(response["type"] === "iou_get"){
                    sessionStorage.setItem('userid', response.payload[0]["user_id"]);
                    sessionStorage.setItem('firstname', response.payload[0]["first_name"]);
                    sessionStorage.setItem('lastname', response.payload[0]["last_name"]);
                    sessionStorage.setItem('assets', response.payload[0]["assets"]);
                    var printed ="<span key='welcome' class='lang'>"+ langArray[lang]['welcome'] +sessionStorage.getItem('firstname'); +"</span>"
                    document.getElementById("showName").innerHTML = printed;
                    $('.dropdown-menu').toggle();
                }
                else {
                    console.log("esa no working hombre");
                }
                console.log("esa no working hombre");
            },
            complete:function(){
                for(var i=0; i<adminArray.length; i++){
                    if(user == adminArray[i]){
                        window.location.replace("../html/bartenderIndex.html");
                        return;
                    }
                }
            }
        });


    });

    $('#button-cancel').click(function(){
        $('.dropdown-menu').toggle();
    });

};


var adminArray = ["ervtod","hirchr","jorass","saskru","svetor"]
$(document).ready(main);
