var messages = function () {         
    var socket = new WebSocket("ws://localhost:3000");

    $('#Crack').on("click", function () {
        socket.send("Is this sent???");
        console.log("Sending message to the server...");
    });
    socket.onmessage = function(event){
        if (event.data.substring(0,3) === "C_S"){
            document.getElementById("color_selected"+event.data.substring(4)).style.backgroundColor = "red";
        }
        console.log(event.data.substring(4));
        console.log(event.data);
    };

    $("div.color_selection").on("click", function () {
        socket.send("C_S " + $(this).attr("id").substring(14))
        console.log($(this).attr("id").substring(14));
    });
    

};
$(document).ready(messages);