var colorClick = function () {
    $('div[id^="C_"]').on("click", function () {
        console.log("Color CLicked");
    });
    $('div[id^="color_selected"]').on("click", function () {
        console.log("Color CLicked");
    });
};
$(document).ready(colorClick);