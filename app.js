
var express = require('express');
var url = require("url");
var websocket = require("ws");
var http = require("http")
var app = express();
var port = process.argv[2];

module.exports = port;

app.use(express.static(__dirname + "/client"));

app.get("/", function(req, res){
  res.sendfile("client/index.html", {root : "./"});
});

app.get("/Game", function(req, res){
  res.sendfile("client/html/game.html", {root : "./"});
});



var server = http.createServer(app);

var connectionID = 0;
var player = 1;
var game = 1;
let games = 0;


const wss = new websocket.Server({ server });

wss.on("connection", function(ws) {
    //let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(function() {
        console.log("Connection state: "+ ws.readyState);
        ws.send("Thanks for the message. --Your server.");
        
        console.log("Connection state: "+ ws.readyState);
        ws.close();
    }, 1000);


    var websockets = {};
     /*
     * two-player game: every two players are added to the same game
     */
    let con = ws; 
    if (connectionID % 2 == 0){
      games++;
   }
    let bahur = connectionID++;
    con.id = bahur;
    let playerType =  player++;
   
    
    
    websockets[con.id] = game;
    //websockets[con.id] = currentGame;

    
    
    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });

    console.log("Player %d placed in game %d as %d", bahur, games, playerType);
});

server.listen(port);


