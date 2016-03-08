/**
 * Created by Sam on 2016-03-08.
 */

var main = function(){
    $('.dropdown-toggle').click(function(){
        $('.dropdown-menu').toggle();
    });
};

$(document).ready(main);