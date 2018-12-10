//import Game from "../../public/javascripts/Game";

var cracked = false;

var messages = function () {   
    function updatePlayerGuess (place, guess, player) {
        socket.send("CMB_SET-" + place + "+" + guess + ">" + player);
    }

    function updatePreviousGuess (place, guess, player) {

    }

    /* Sets the color for the player (passed as a parameter) in game plh (placeholder) to the given color */
    function setColors (plh, color, player) {
        (player === "A") ? console.log(plh.p1Selected) : console.log(plh.p2Selected);    // Color that was selected by the player
        place = color.id.substring(14);
        if (player === "A" && plh.p1Selected != "undefined") {
            processColor(color, place, player, plh.p1Selected);
        }
        else if (player === "A" && plh.p1Selected == "undefined") {
            processColor(color, place, player, -1);
        }
        else if (player === "B" && plh.p2Selected != "undefined") {
            processColor(color, place, player, plh.p2Selected);
        }
        else if (player === "B" && plh.p2Selected == "undefined") {
            processColor(color, place, player, -1);
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
            default: color.style.backgroundColor = "black"; updatePlayerGuess(place, -1, player); break;
        }
    };
    
    /*Deselects all available colors (shows this through CSS, actual value removed using JS). */
    function clearSelectionChoice () {
        // for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
        //     document.getElementById("C_"+i).style.backgroundColor = "white";
        // }
        socket.send("RM_RESET_SELECTED_COLOR_2");
    };

    /* Sets the solution as the current guess and disables all buttons. */
    function showSolution (combination) {
        for(var i = 0; i < 4; i++) {
            color = "color_selected" + (i + 1);
            switch (combination[i]){
                case 1: document.getElementById(color).style.backgroundColor = "brown"; break;
                case 2: document.getElementById(color).style.backgroundColor = "red"; break;
                case 3: document.getElementById(color).style.backgroundColor = "orange"; break;
                case 4: document.getElementById(color).style.backgroundColor = "yellow"; break;
                case 5: document.getElementById(color).style.backgroundColor = "green"; break;
                case 6: document.getElementById(color).style.backgroundColor = "#40E0D0"; break;
                case 7: document.getElementById(color).style.backgroundColor = "blue"; break;
                case 8: document.getElementById(color).style.backgroundColor = "purple"; break;
            }
        }
            // processColor(color, ("color_selected" + (i + 1)), player, com[i]);
    };

    /* Creating our server using Websockets. */
    var socket = new WebSocket("ws://localhost:3000");

    setTimeout(function() {
        socket.send("RDY _PLAYER_CONNECTED_TO_A_GAME");
        console.log("Player-ready sent...");
      //ws.close();
      }, 700);
    

    //$("#game_body").attr("disabled", true);
    $("#game_body").hide();

    $("#Crack").attr("disabled", "disabled");

    $("#return_m_m_button").on('click', function() {
        window.location.replace("./");
    });

    /* When the crackbutton is clicked, do nothing? */
    $('#Crack').on("click", function () {
        //TODO if it's then clicked, send message to server and compare player input to CMB
        //TODO send back results
        if(!cracked) {
            socket.send("CRC_TRY_CRACKING_THE_CODE");
            console.log("Sending your guess to the server...");
        }
        else {
            console.log("The code has been cracked. No more guesses can be made.");
        }
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
                // for (var i = 1; document.body.contains(document.getElementById("C_"+ i)); i++){
                //     document.getElementById("C_"+i).style.backgroundColor = "white";
                // }
                // document.getElementById("C_"+data.message.substring(4)).style.backgroundColor = "darkgrey";

            }
            else if (key === "CRA") {
                console.log("Crack button will enable now...");
                $("#Crack").prop("disabled", false);
            }
            else if (key === "FDB") {
                var num;
                var guess;
                if (data.player === "A") {
                    num = data.game.previousGuesses1.attemptsMade;
                }
                else {
                    num = data.game.previousGuesses2.attemptsMade;
                }
                var place = 'a';
                var guess = data.guess;
                console.log(guess);
                console.log("num: " + num + " guess: " + guess);
                for (var i = 0; i < 4; i++) {
                    console.log("G" + num + place);
                    console.log(guess[i]);
                    switch (guess[i]){
                        case "1": document.getElementById("G" + num + place).style.backgroundColor = "brown"; break;
                        case "2": document.getElementById("G" + num + place).style.backgroundColor = "red"; break;
                        case "3": document.getElementById("G" + num + place).style.backgroundColor = "orange"; break;
                        case "4": document.getElementById("G" + num + place).style.backgroundColor = "yellow"; break;
                        case "5": document.getElementById("G" + num + place).style.backgroundColor = "green"; break;
                        case "6": document.getElementById("G" + num + place).style.backgroundColor = "#40E0D0"; break;
                        case "7": document.getElementById("G" + num + place).style.backgroundColor = "blue"; break;
                        case "8": document.getElementById("G" + num + place).style.backgroundColor = "purple"; break;
                    }
                    switch (place) {
                        case "a": place = "b"; break;
                        case "b": place = "c"; break;
                        case "c": place = "d"; break;
                        default: place = "a";
                    }       
                }
                console.log("color: " + data.corrColor)
                document.getElementById("Cr_Pl_" + num).innerHTML = data.corrPlaces;
                document.getElementById("Cr_Cl_" + num).innerHTML = data.corrColor;
                
                
                /* Clears the current guess (since the guess has been added to the previous guesses). */
                // for (var i = 1; document.body.contains(document.getElementById("color_selected"+ i)); i++){
                //     document.getElementById("color_selected"+i).style.backgroundColor = "white";
                // }
                socket.send("CLR_ARRAY");
                }

            else if (key === "SRG") {
                console.log("STARTING THE GAME........");
                //$("#game_body").attr("disabled", false);
                $("#game_body").show();
                //$("#waiting_screen").attr("disabled", true);
                $("#waiting_screen").hide();
            }
            else if (key === "WIN") {
                console.log("All buttons will disable.")
                $("#Crack").prop("disabled", true);
                $("#clear_selection").prop("disabled", true);
                $(".concede_button").prop("disabled", true);
                $("#N_C").hide();
                $("#Cracked").show();
                cracked = true;
                socket.send("WON_OTHER_PLAYER_IS_A_LOSER");
                alert("Congratulations! You've cracked the code and won the game!");
                socket.terminate(); 
            }
            else if (key === "LSR") {
                $("#Crack").prop("disabled", true);
                $("#clear_selection").prop("disabled", true);
                $(".concede_button").prop("disabled", true);
                alert("Too bad; the other player cracked the code first. You lost the game.");
                var combination = data.game.combination;
                showSolution(combination);
                socket.terminate();
                
            }
            else if (key === "GG_") {
                console.log("Connection to the server is closed now.")
                socket.terminate();
            }
            else if (key === "WBD") {
                alert("You've won this game by default; the other player has given up.");
                var com = data.game.combination;
                showSolution(com);
                $("#Crack").prop("disabled", true);
                $("#clear_selection").prop("disabled", true);
                $(".concede_button").prop("disabled", true);
                // $(".main_menu").append("<a href='./' id='return_m_m_button'>Return To Main Menu</a>");
                
                //socket.terminate();
                cracked = true;
            }
            else if (key === "GO_") {
                var com = data.game.combination;
                console.log("Combination: " + com);
                showSolution(com);
                $("#Crack").prop("disabled", true);
                $("#clear_selection").prop("disabled", true);
                $(".concede_button").prop("disabled", true);
                socket.terminate();
            }
        }
        catch (err) {
            console.log(err.message);
        }
        
    };


    $("div.color_selection").on("click", function () {
        if (!cracked) {
            socket.send("C_S " + $(this).attr("id").substring(14))
            //console.log($(this).attr("id").substring(14));
        }
        else {
            console.log("The code has been cracked. No more guesses can be made.");
        }
    });

    $('div[id^="C_"]').on("click", function () {
        if (!cracked) {
            socket.send("C_C " + $(this).attr("id").substring(2));
            console.log("C_C " + $(this).attr("id").substring(2));
        }
        else {
            console.log("The code has been cracked. No more guesses can be made.");
        }
    });

    $("#clear_selection").on("click", function (){
        if (!cracked) {
            for (var i = 1; document.body.contains(document.getElementById("color_selected"+ i)); i++){
                document.getElementById("color_selected"+i).style.backgroundColor = "white";
            }
            socket.send("CLR_ARRAY");
        }
        else {
            console.log("The code has been cracked. No more guesses can be made.");
        }
    });

    $(".concede_button").on("click", function (event) {
        //console.log("CLICKED")
        var c = confirm("You are about to concede the current game.\nAre you sure you want to do this?");
        if (c == true) {
            console.log("CONCEDED");
            socket.send("IGU_THIS_PLAYER_HAS_CONCEDED");
        } else {
            console.log("DECLINED");
        }        
    });

    $("#fullscreen").on("click", function (event) {
        console.log("fullscreen requested :(")
        var elem = document.getElementById("body"); 
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    });


    

};
$(document).ready(messages);