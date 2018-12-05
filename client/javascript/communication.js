//import Game from "../../public/javascripts/Game";



var messages = function () {   
    function updatePlayerGuess (place, guess, player) {
        socket.send("CMB_SET-" + place + "+" + guess + ">" + player);
    }

    /* Sets the color for the player (passed as a parameter) in game plh (placeholder) to the given color */
    function setColors (plh, color, player) {
        (player === "A") ? console.log(plh.p1Selected) : console.log(plh.p2Selected);    // Color that was selected by the player
        place = color.id.substring(14);
        if (player === "A" && plh.p1Selected != "undefined") {
            processColor(color, place, player, plh.p1Selected);
        }
        else if (player === "B" && plh.p2Selected != "undefined") {
            processColor(color, place, player, plh.p2Selected);
        }
        console.log("ELEMENT ID: " + color.id.substring(14));
        clearSelectionChoice();
    };

    /* Sets the color (using CSS) for the appropriate player in the approprite place. */
    function processColor (color, place, player, PSelected) {
        switch (PSelected){
            case "1": color.style.backgroundColor = "brown"; updatePlayerGuess(place, 1, player); break;
            case "2": color.style.backgroundColor = "red"; updatePlayerGuess(place, 2, player); break;
            case "3": color.style.backgroundColor = "orange"; updatePlayerGuess(place, 3, player); break;
            case "4": color.style.backgroundColor = "yellow"; updatePlayerGuess(place, 4, player); break;
            case "5": color.style.backgroundColor = "green"; updatePlayerGuess(place, 5, player); break;
            case "6": color.style.backgroundColor = "#40E0D0"; updatePlayerGuess(place, 6, player); break;
            case "7": color.style.backgroundColor = "blue"; updatePlayerGuess(place, 7, player); break;
            case "8": color.style.backgroundColor = "purple"; updatePlayerGuess(place, 8, player); break;
            default: color.style.backgroundColor = "black"; updatePlayerGuess(place, 0, player); break;
        }
    };
    
    /*Deselects all available colors (shows this through CSS, actual value removed using JS). */
    function clearSelectionChoice () {
        for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
            document.getElementById("C_"+i).style.backgroundColor = "white";
        }
        socket.send("RM_RESET_SELECTED_COLOR_2");
    };

    /* Creating our server using Websockets. */
    var socket = new WebSocket("ws://localhost:3000");

    $("#Crack").prop("disabled", true);

    /* When the crackbutton is clicked, do nothing? */
    $('#Crack').on("click", function () {
        //TODO disable crackbutton by default
        //TODO when value in array is changed, check if any of them are 0, if none are 0 enable crack button
        //TODO if it's then clicked, send message to server and compare player input to CMB
        //TODO send back results
        socket.send("Is this sent???");
        console.log("Sending message to the server...");
    });

    socket.onmessage = function(event){
        try {

            data = JSON.parse(event.data);
            //console.log(data);
            var key = data.message.substring(0,3);      // Get 3 letter key containing the type of event.
            
            /* Checks which color is selected by which player and calls the setColors function for the appropriate party */
            if (key === "C_S"){
                var plh = data.game;// = new Game("placeholder", "placeholder");
                var color = document.getElementById("color_selected"+data.message.substring(4));
                color.style.backgroundColor = "red";    // Default in case no color is selected. 

                setColors(plh, color, data.player);          
            }
            /* Shows which color choice has been selected by making that elements background grey and
            making all other options' backgrounds the others white. */
            else if (key === "C_C") {
                for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
                    document.getElementById("C_"+i).style.backgroundColor = "white";
                }
                document.getElementById("C_"+data.message.substring(4)).style.backgroundColor = "darkgrey";

            }
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
        socket.send("CLR_ARRAY");
    });

    

};
$(document).ready(messages);


