
var express = require('express');
var url = require("url");
var websocket = require("ws");
var http = require("http")
var app = express();
var port = process.argv[2];
var gameStats = require("./public/javascripts/GameStats");
var Game = require("./public/javascripts/Game");

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

wss.on("connection", function(ws) {
    //let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(function() {
        console.log("Connection state: "+ ws.readyState);
        ws.send("Thanks for the message. --Your server.");
        
        console.log("Connection state: "+ ws.readyState);
        ws.close();
    }, 1000);

    var player = gameStats.newPlayerID();
    console.log(gameStats.totalPlayers + "\n\n");


    var websockets = {};
     /*
     * two-player game: every two players are added to the same game
     */



    let con = ws; 
   
    if (gameStats.isPlayerAvailable()){
      currentGame = new Game(player, gameStats.newGameID());
      console.log("IF");
    }
    else {
      console.log("elseef");
      currentGame.startGame(player);
      console.log("else");
    }
    //let bahur = gameStats.totalGames++;
    //con.id = bahur;
    // let playerType;

    
    
    //websockets[con.id] = game;
    //websockets[con.id] = currentGame;

    
    
    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });

    console.log("Player %s placed in game %s", player, currentGame.gameID);
});

server.listen(port);


