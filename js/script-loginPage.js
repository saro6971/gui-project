/**
 * Created by Sam on 2016-03-08.
 */

var main = function(){
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
            success : function(text)
            {
                response = text;
                if(response["type"] === "iou_get"){
                    console.log(JSON.stringify(response));
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