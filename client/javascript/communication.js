//import Game from "../../public/javascripts/Game";



var messages = function () {   
    function updatePlayerGuess (place, guess, player) {
        socket.send("CMB_SET-" + place + "+" + guess + ">" + player);
    }

    function setColorsA (plh, color) {
        console.log(plh.p1Selected);
        place = color.id.substring(14);
        if (plh.p1Selected != "undefined") {
            switch (plh.p1Selected){
                case "1": color.style.backgroundColor = "brown"; updatePlayerGuess(place, 1, "A"); break;
                case "2": color.style.backgroundColor = "red"; updatePlayerGuess(place, 2, "A"); break;
                case "3": color.style.backgroundColor = "orange"; updatePlayerGuess(place, 3, "A"); break;
                case "4": color.style.backgroundColor = "yellow"; updatePlayerGuess(place, 4, "A"); break;
                case "5": color.style.backgroundColor = "green"; updatePlayerGuess(place, 5, "A"); break;
                case "6": color.style.backgroundColor = "#40E0D0"; updatePlayerGuess(place, 6, "A"); break;
                case "7": color.style.backgroundColor = "blue"; updatePlayerGuess(place, 7, "A"); break;
                case "8": color.style.backgroundColor = "purple"; updatePlayerGuess(place, 8, "A"); break;
                default: color.style.backgroundColor = "black"; updatePlayerGuess(place, 0, "A"); break;
            }
            //color.style.backgroundColor = "yellow";
            console.log("ELEMENT ID: " + color.id.substring(14));
            clearSelectionChoice();
        }
    }
    function setColorsB (plh, color) {
        console.log(plh.p2Selected);
        place = color.id.substring(14);
        if (plh.p2Selected != "undefined") {
            switch (plh.p2Selected){
                case "1": color.style.backgroundColor = "brown"; updatePlayerGuess(place, 1, "A"); break;
                case "2": color.style.backgroundColor = "red"; updatePlayerGuess(place, 2, "A"); break;
                case "3": color.style.backgroundColor = "orange"; updatePlayerGuess(place, 3, "A"); break;
                case "4": color.style.backgroundColor = "yellow"; updatePlayerGuess(place, 4, "A"); break;
                case "5": color.style.backgroundColor = "green"; updatePlayerGuess(place, 5, "A"); break;
                case "6": color.style.backgroundColor = "#40E0D0"; updatePlayerGuess(place, 6, "A"); break;
                case "7": color.style.backgroundColor = "blue"; updatePlayerGuess(place, 7, "A"); break;
                case "8": color.style.backgroundColor = "purple"; updatePlayerGuess(place, 8, "A"); break;
                default: color.style.backgroundColor = "black"; updatePlayerGuess(place, 0, "A"); break;
            }
            console.log("ELEMENT ID: " + color.id.substring(14));
            //color.style.backgroundColor = "blue";
            clearSelectionChoice();
        }
    }
    
    function clearSelectionChoice () {
        for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
            document.getElementById("C_"+i).style.backgroundColor = "white";
        }
        socket.send("RM_RESET_SELECTED_COLOR_2");
    }

    var socket = new WebSocket("ws://localhost:3000");

    $('#Crack').on("click", function () {
        socket.send("Is this sent???");
        console.log("Sending message to the server...");
    });
    socket.onmessage = function(event){
        try {

        
        data = JSON.parse(event.data);
        //console.log(data);
        if (data.message.substring(0,3) === "C_S"){
            var plh;// = new Game("placeholder", "placeholder");
            var color = document.getElementById("color_selected"+data.message.substring(4));
            color.style.backgroundColor = "red";
            plh = data.game;

            if (data.player === "A") {
                setColorsA(plh, color);
            }
            else if (data.player === "B"){
                setColorsB(plh, color);
            }
            
        }
        else if (data.message.substring(0,3) === "C_C") {
            for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
                document.getElementById("C_"+i).style.backgroundColor = "white";
            }
            document.getElementById("C_"+data.message.substring(4)).style.backgroundColor = "darkgrey";
        }
        //console.log(data.message.substring(4));
        //console.log(data.message);
        }
        catch {
            console.log(event.data);
        }
        
    };

    $("div.color_selection").on("click", function () {
        socket.send("C_S " + $(this).attr("id").substring(14))
        //console.log($(this).attr("id").substring(14));
    });

    $('div[id^="C_"]').on("click", function () {
        socket.send("C_C " + $(this).attr("id").substring(2));
        console.log("C_C " + $(this).attr("id").substring(2));
    });

    $("#clear_selection").on("click", function (){
        for (var i = 1; document.body.contains(document.getElementById("color_selected"+ i)); i++){
            document.getElementById("color_selected"+i).style.backgroundColor = "white";
        }
    });

    

};
$(document).ready(messages);


