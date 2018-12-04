
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
      //console.log("else");
    }
    //let bahur = gameStats.totalGames++;
    //con.id = bahur;
    // let playerType;

    
    
    //websockets[con.id] = game;
    //websockets[con.id] = currentGame;

    
    
    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
        var key = message.substring(0,3);
        if (key === "C_S"){

          var p = (con === currentGame.player1) ? "A" : "B";
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
          currentGame.setPSelected(con, undefined);
          var choice = currentGame.getPSelected(con);
          var p = (con === currentGame.player1) ? "A" : "B";
          console.log("Player " + p + "'s selecton has been cleared to: " + choice);
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


