// var Game = require("../../public/javascripts/Game");

var messages = function () {         
    var socket = new WebSocket("ws://localhost:3000");

    $('#Crack').on("click", function () {
        socket.send("Is this sent???");
        console.log("Sending message to the server...");
    });
    socket.onmessage = function(event){
        try {

        
        data = JSON.parse(event.data);
        console.log(data);
        if (data.message.substring(0,3) === "C_S"){
            for (var i = 1; document.body.contains(document.getElementById("color_selected"+ i)); i++){
            document.getElementById("color_selected"+i).style.backgroundColor = "white";
            }
            var color = document.getElementById("color_selected"+data.message.substring(4));
            //color.style.backgroundColor = "red";
            //console.log(data.game.);
            var p = (data.con === data.game.player1) ? 1 : 2;
            console.log("Working");
            if (p === 1) {
                if (data.game.p1Selected != undefined) {
                    color.style.backgroundColor = "yellow";
                    data.game.p1Selected = undefined;
                }
            }
            else {
                if (data.game.p2Selected != undefined) {
                    color.style.backgroundColor = "blue";
                    data.game.p2Selected = undefined;
                }
            }
        }
        else if (data.message.substring(0,3) === "C_C") {
            for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
                document.getElementById("C_"+i).style.backgroundColor = "white";
            }
            document.getElementById("C_"+data.message.substring(4)).style.backgroundColor = "green";
        }
        //console.log(data.message.substring(4));
        console.log(data.message);
        }
        catch {
            console.log(event.data);
        }
        
    };

    $("div.color_selection").on("click", function () {
        socket.send("C_S " + $(this).attr("id").substring(14))
        console.log($(this).attr("id").substring(14));
    });

    $('div[id^="C_"]').on("click", function () {
        socket.send("C_C " + $(this).attr("id").substring(2));
        console.log("C_C " + $(this).attr("id").substring(2));
    });

    

};
$(document).ready(messages);