
var stats = function () {
    "use strict";
    var socket = new WebSocket("ws://localhost:3000");

    

    setTimeout(function() {
        socket.send("STS_RECEIVE_INFO_STATS");
        console.log("Stats requested...");
      //ws.close();
      }, 500);

    socket.onmessage = function(event){
        try {

            var data = JSON.parse(event.data);
            //console.log(data);
            var key = data.message.substring(0,3);      // Get 3 letter key containing the type of event.
            
            /* Checks which color is selected by which player and calls the setColors function for the appropriate party */
            if (key === "SRS"){
                console.log("Games: " + data.gamesInitialised + "\nPlayers: " + data.currentPlayers);
                $("#G_P").html(data.gamesInitialised);
                $("#C_P").html(data.currentPlayers);
            }
        }
        catch (err){
            console.log(err.message);
        }
    };
};
$(document).ready(stats);