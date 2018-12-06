
var express = require('express');
var url = require("url");
var websocket = require("ws");
var http = require("http")
var app = express();
var port = process.argv[2];
var gameStats = require("./public/javascripts/GameStats");
var Game = require("./public/javascripts/Game");
var messages = require("./client/javascript/messages.js")

module.exports = port;

app.use(express.static(__dirname + "/client"));

app.get("/", function(req, res){
  res.sendfile("client/index.html", {root : "./"});
});

app.get("/Game", function(req, res){
  res.sendfile("client/html/game.html", {root : "./"});
});



var server = http.createServer(app);



var game = 1;


const wss = new websocket.Server({ server });
var currentGame;
var instance;
var websockets = {};

wss.on("connection", function(ws, req) {
    //let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(function() {
        console.log("Connection state: "+ ws.readyState);
        ws.send("Thanks for the message. --Your server.");
        
        console.log("Connection state: "+ ws.readyState);
        //ws.close();
    }, 1000);

    var player = gameStats.newPlayerID();
    //console.log(gameStats.totalPlayers + "\n\n");


    var websockets = {};
     /*
     * two-player game: every two players are added to the same game
     */

    var ip = req.connection.remoteAddress;

    let con = ws; 
    
   
    if (gameStats.isPlayerAvailable()){
      instance = messages.O_GAME_WON_BY;
      currentGame = new Game(con, gameStats.newGameID());
      instance.player1 = "A";
      //console.log("IF");
    }
    else {
      //console.log("elseef");
      currentGame.startGame(con);
      instance.player2 = "B";
      // currentGame.messageBothPlayers(instance.type, instance.player1, instance.player2);
      console.log("\nCombination is: " + JSON.stringify(currentGame.getCombination()));
      setTimeout(function () {
        var m = {
          message: "SRG_GAME_IS_ABLE_TO_START",
        };
        m = JSON.stringify(m);
        currentGame.messageToPlayers(m);
      }, 1000);


      //console.log("else");
    }
    //let bahur = gameStats.totalGames++;
    //con.id = bahur;
    // let playerType;

    
    
    //websockets[con.id] = game;
    //websockets[con.id] = currentGame;

    function checkCrackable (plh, player) {
      currentGuessPlayer = (player === "A") ? plh.currentGuessP1 : plh.currentGuessP2;
      console.log(currentGuessPlayer);
      for (var i = 0; i < 4; i++) {
          if(currentGuessPlayer[i] === 0) {
              return false;
          }
      }
      return true;
    };
    
    ws.on("message", function incoming(message) {
        console.log("\t[LOG] " + message);
        var key = message.substring(0,3);
        if (key === "C_S"){

          var p = (con === currentGame.player1) ? "A" : "B";
          var info = {
            message: message,
            game: currentGame,
            con: con,
            player: p
          }
          
          var m = JSON.stringify(info);
          //console.log(m);
          ws.send(m);
        }

        else if (key === "C_C"){
          currentGame.setPSelected(con, message.substring(4));
          
          var choice = currentGame.getPSelected(con);
          var p = (con === currentGame.player1) ? "A" : "B";
          console.log("Player " + p + " Selected: " + choice);
          var info = {
            message: message,
            game: currentGame,
            con: con,
            player: p
          }
          m = JSON.stringify(info);
          //console.log(m);
          ws.send(m);
        }

        else if (key === "RM_"){
          currentGame.setPSelected(con, "undefined");
          var choice = currentGame.getPSelected(con);
          var p = (con === currentGame.player1) ? "A" : "B";
          console.log("Player " + p + "'s selection has been cleared to: " + choice);
          console.log(currentGame.getPSelected(con));
        }

        else if (key === "CMB"){
          var place = message.substring(message.indexOf("-")+1, message.indexOf("+"));
          var guess = message.substring(message.indexOf("+")+1, message.indexOf(">"));
          var pl = message.substring(message.indexOf(">")+1)
          console.log("Place of the Guess: " + place + " Guess: " + guess + " Player: " + pl);
          place = place - 1;
          if (pl === "A") {
            currentGame.setCurrentGuessP1(place, guess);
            console.log(currentGame.getCurrentGuessP1());
          }
          else if (pl === "B"){
            currentGame.setCurrentGuessP2(place, guess);
            console.log(currentGame.getCurrentGuessP2());
          }

          if (checkCrackable(currentGame, pl)) {
            console.log("Crack button is now enabled.")
            var info = {
              message: "CRA_THE_CRACK_BUTTON_SHOULD_ENABLE"
            }
            m = JSON.stringify(info);
            ws.send(m);
          }   
        }
        else if (key === "CLR") {




          currentGame.clearPlayerGuess(con);
          var pl = (con === currentGame.getPlayerOne()) ? "A" : "B";
          var gss = (con === currentGame.getPlayerOne()) ? currentGame.getCurrentGuessP1() : currentGame.getCurrentGuessP2();
          console.log("Cleared guess  for player " + pl + " to " + gss);
        }
        else if (key === "CRC") {
          var p = (con === currentGame.player1) ? "A" : "B";
          if(p === "A") {
            currentGame.previousGuesses1.setNextAttempt(currentGame.currentGuessP1);
            console.log("The guess "+ currentGame.currentGuessP1 + " Has been added to Player1's PreviousGuesses. " + JSON.stringify(currentGame.previousGuesses1));

            var corrPlaces = currentGame.placesCorrect(currentGame.currentGuessP1, currentGame.getCombination());
            var corrColor = currentGame.colorsCorrect(currentGame.currentGuessP1, currentGame.getCombination()) - corrPlaces;
          }
          else {
            currentGame.previousGuesses2.setNextAttempt(currentGame.currentGuessP2);
            console.log("The guess "+ currentGame.currentGuessP2 + " Has been added to Player2's PreviousGuesses." + JSON.stringify(currentGame.previousGuesses2));

            var corrPlaces = currentGame.placesCorrect(currentGame.currentGuessP2, currentGame.getCombination());
            var corrColor = currentGame.colorsCorrect(currentGame.currentGuessP2, currentGame.getCombination()) - corrPlaces;
          }
                    
          console.log("color+place correct: " + corrPlaces + " and color correct: " + corrColor);
          console.log(currentGame.getCombination());
          
          var info = {
            message: "FDB_FEEDBACK_ON_PREVIOUS_GUESS",
            game: currentGame,
            con: con,
            player: p,
            pla: corrPlaces,
            col: corrColor
          }
          m = JSON.stringify(info);
          ws.send(m);
        }
        else {
          ws.send("Yup, got it. --Your server.");
        }

    });

    console.log("\nPlayer %s placed in game %s\n", player, currentGame.gameID);
});

server.listen(port, function (){
  console.log("Server Started. Listening on port " + port + "...");
});


