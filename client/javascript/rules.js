var description = "<p class=\"r_desc\">This is how you play...<br>First<br>Second</p>";

var rules = function () {
    "use strict";
    $(".rules_button").on("click", function (event) {
        //console.log("CLICKED")
        $("p").remove(".r_desc");
        $(".rules_description").append(description);
        $(".rules_description").toggle()
    });
};
$(document).ready(rules);