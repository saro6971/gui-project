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

    if(asset !=null && document.getElementById('assetsInfoLi') != null){

        var inserts = "<span key='assetsInfo'' class='lang'>"  + langArray[sessionStorage.getItem('sessionLanguage')]['assetsInfo'] + "</span>";
        inserts += sessionStorage.getItem('assets');
        document.getElementById("assetsInfoLi").innerHTML = inserts;
    }



    $('.dropdown-toggle').click(function(){
        $('.dropdown-menu').toggle();
    });


/**
 * When a user presses the login button an ajax request is made to the database which checks that
 * the username and password provided bgy the user is actually correct. It saves the name and password in
 * sessionstorage in order to save the information if the pages are changed. It also checks if the name and password provided
 * is that of an admin account in, depending on if it is or isn't it decides the privileges that the user has once logged in.
 * When a user is logged in he also recieves some information that he actually is logged in. In this case it shows the name and assets
 * of the user.
 * */
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

                    var inserts = "<span key='assetsInfo'' class='lang'>"  + langArray[sessionStorage.getItem('sessionLanguage')]['assetsInfo'] + "</span>";
                    inserts += sessionStorage.getItem('assets');
                    document.getElementById("assetsInfoLi").innerHTML = inserts;
                }
                else {
                    console.log("No such user exists");
                }

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
        var userlog = sessionStorage.getItem('user');
        if(userlog != null){
            $('#logoutli').show();
            $('#loginli').hide();
        }else {
            $('#logoutli').hide();
        }

    });

    $('#button-cancel').click(function(){
        $('.dropdown-menu').toggle();
    });

    var userlog = sessionStorage.getItem('user');
    if(userlog != null){
        $('#loginli').hide();
    }else {
        $('#logoutli').hide();
    }

};


var adminArray = ["ervtod","hirchr","jorass","saskru","svetor"]
$(document).ready(main);
