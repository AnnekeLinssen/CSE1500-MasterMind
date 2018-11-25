var concede = function () {
    "use strict";
    $(".concede_button").on("click", function (event) {
        //console.log("CLICKED")
        var c = confirm("You are about to concede the current game.\nAre you sure you want to do this?");
        if (c == true) {
            console.log("CONCEDED");
        } else {
            console.log("DECLINED");
        }

        
    });
};
$(document).ready(concede);