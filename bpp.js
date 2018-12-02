
var gameStatus = require('/public/javascripts/GameStats.js');
var game = require('/public/javascripts/Game.js')
var express = require('express');
var url = require("url");

var websocket = require("ws");
var http = require("http")

var app = express();

var  port = process.argv[2];

app.use(express.static(__dirname + "/client"));

app.get("/", function(req, res){
  res.sendfile("client/index.html", {root : "./"});
});

app.get("/Game", function(req, res){
  res.sendfile("client/html/game.html", {root : "./"});
});

var server = http.createServer(app).listen(port);

const wss = new websocket.Server({server});

wss.on("connection", function(ws) {
  let con = GameStatus.newPlayerID;
  if (!gameStatus.isPlayerAvailable) {
    var currentGame = new Game(con);
  }
  else {
    currentGame.startGame(con);
  }
)};