
var express = require('express');
var url = require("url");
var websocket = require("ws");
var http = require("http")
var app = express();
var port = process.argv[2];
var gameStats = require("./public/javascripts/GameStats");
var Game = require("./public/javascripts/Game");
var messages = require("./client/javascript/messages.js")
var cookies = require("cookie-parser");
var credentials = require('./credentials.js');


var server = http.createServer(app);
const wss = new websocket.Server({ server });
var currentGame;
var instance;
var playersLoaded = 0;
var visits = 0;
module.exports = port;

app.use(cookies(credentials.cookieSecret));

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');


app.get("/", function(req, res){
  var vis = 1;
  if (req.signedCookies.signed_visits != undefined) {
    vis = ++req.signedCookies.signed_visits;
  }
  //res.cookie("chocolate", "kruemel");
  res.cookie("signed_visits", vis, { signed: true});
  res.render('index.ejs', { gamesInitialized: gameStats.totalGames, playersOnline: playersLoaded, vititedTimes: (vis === 1) ? vis : req.signedCookies.signed_visits });
  playersLoaded = playersLoaded + 1;
});

app.get("/Game", function(req, res){
  console.log("++++ unsigned ++++");
  console.log(req.cookies);
  console.log("++++ signed ++++");
  console.log(req.signedCookies);
  res.sendfile("game.html", {root : "./public"});
});






//var game = 1;



//var websockets = {};

wss.on("connection", function(ws, req) {
    //let's slow down the server response time a bit to make the change visible on the client side
    // setTimeout(function() {
    //     console.log("Connection state: "+ ws.readyState);
    //     ws.send("Thanks for the message. --Your server.");
        
    //     console.log("Connection state: "+ ws.readyState);
    //     //ws.close();
    // }, 1000);

    //var player = gameStats.newPlayerID();
    //console.log(gameStats.totalPlayers + "\n\n");


    //var websockets = {};
     /*
     * two-player game: every two players are added to the same game
     */

    //var ip = req.connection.remoteAddress;
   // ws.isAlive = true;
    let con = ws; 
    
   
    // if (gameStats.isPlayerAvailable()){
    //   instance = messages.O_GAME_WON_BY;
    //   currentGame = new Game(con, gameStats.newGameID());
    //   instance.player1 = "A";
    //   //console.log("IF");
    // }
    // else {
    //   //console.log("elseef");
    //   currentGame.startGame(con);
    //   instance.player2 = "B";
    //   // currentGame.messageBothPlayers(instance.type, instance.player1, instance.player2);
    //   console.log("\nCombination is: " + JSON.stringify(currentGame.getCombination()));
    //   setTimeout(function () {
    //     var m = {
    //       message: "SRG_GAME_IS_ABLE_TO_START",
    //     };
    //     m = JSON.stringify(m);
    //     currentGame.messageToPlayers(m);
    //   }, 1000);


      //console.log("else");
    //}
    //let bahur = gameStats.totalGames++;
    //con.id = bahur;
    // let playerType;

    
    
    //websockets[con.id] = game;
    //websockets[con.id] = currentGame;

    function checkCrackable (plh, player) {
      currentGuessPlayer = (player === "A") ? plh.currentGuessP1 : plh.currentGuessP2;
      console.log(currentGuessPlayer);
      for (var i = 0; i < 4; i++) {
          if(currentGuessPlayer[i] <= 0) {
              return false;
          }
      }
      return true;
    };
    
    ws.on('close', function close() {
      playersLoaded = playersLoaded - 1;
      if (currentGame != undefined) {
        console.log("Total players: " + gameStats.totalPlayers);
        if (ws === currentGame.player2 && currentGame.player1 != null) {
          console.log("Player 2 disconnected");
          var p = "A";
          var ws_w = currentGame.player1;
          info = {
            message: "WBD_PLAYER_CLOSED_CONNECTION",
            game: currentGame,
            //con: con,
            player: p
          }
          var m = JSON.stringify(info);
          ws_w.send(m);
          ws.terminate();
        }
        else if (ws === currentGame.player1 && currentGame.player2 != null) {
          console.log("Player 1 disconnected");
          var p = "B";
          var ws_w = currentGame.player2;
          info = {
            message: "WBD_PLAYER_CLOSED_CONNECTION",
            game: currentGame,
            //con: con,
            player: p
          }
          var m = JSON.stringify(info);
          ws_w.send(m);
          ws.terminate();
        }
      }
    });

    ws.on("message", function incoming(message) {
        console.log("\t[LOG] " + message);
        var key = message.substring(0,3);
        if (key === "RDY") {
          gameStats.newPlayerID()
          if (gameStats.isPlayerAvailable()){
            instance = messages.O_GAME_WON_BY;
            currentGame = new Game(con, gameStats.newGameID());
            instance.player1 = "A";
          }
          else {
            currentGame.startGame(con);
            instance.player2 = "B";
            console.log("\nCombination is: " + JSON.stringify(currentGame.getCombination()));
            setTimeout(function () {
              var m = {
                message: "SRG_GAME_IS_ABLE_TO_START",
              };
              m = JSON.stringify(m);
              currentGame.messageToPlayers(m);
            }, 1000);
          }
        }
        else if (key === "C_S"){

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

        else if (key === "STS") {
          var info = {
            message: "SRS_STATS_RESULTS",
            gamesInitialised: gameStats.totalGames,
            currentPlayers : playersLoaded
          }
          playersLoaded = playersLoaded + 1;
          var m = JSON.stringify(info);

          setTimeout(function() {
            //gameStats.totalGames = gameStats.totalGames - 1;
            ws.send(m);
            console.log("Stats send...");
            
            ws.terminate();
          //ws.close();
          }, 500);
          
          
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
          var corrPlaces;
          var corrColor;
          if(p === "A") {
            currentGame.previousGuesses1.setNextAttempt(currentGame.currentGuessP1);
            console.log("The guess "+ currentGame.currentGuessP1 + " Has been added to Player1's PreviousGuesses. " + JSON.stringify(currentGame.previousGuesses1));

            corrPlaces = currentGame.placesCorrect(currentGame.currentGuessP1, currentGame.getCombination());
            corrColor = currentGame.colorsCorrect(currentGame.currentGuessP1, currentGame.getCombination()) - corrPlaces;
          }
          else {
            currentGame.previousGuesses2.setNextAttempt(currentGame.currentGuessP2);
            console.log("The guess "+ currentGame.currentGuessP2 + " Has been added to Player2's PreviousGuesses." + JSON.stringify(currentGame.previousGuesses2));

            corrPlaces = currentGame.placesCorrect(currentGame.currentGuessP2, currentGame.getCombination());
            corrColor = currentGame.colorsCorrect(currentGame.currentGuessP2, currentGame.getCombination()) - corrPlaces;
          }
                    
          console.log("color+place correct: " + corrPlaces + " and color correct: " + corrColor);
          console.log(currentGame.getCombination());
          
          var info = {
            message: "FDB_FEEDBACK_ON_PREVIOUS_GUESS",
            game: currentGame,
            con: con,
            player: p,
            corrPlaces: corrPlaces,
            corrColor: corrColor,
            guess: (p == "A") ? currentGame.previousGuesses1.getAttempti(currentGame.previousGuesses1.attemptsMade - 1) : currentGame.previousGuesses2.getAttempti(currentGame.previousGuesses2.attemptsMade - 1)
          }
          console.log("G : " + info.guess + " INDEX:  " +(currentGame.previousGuesses2.attemptsMade - 1));
          m = JSON.stringify(info);
          ws.send(m);

          if (corrPlaces == 4) {
            var info = {
              message: "WIN_PLAYER_CRACKED_COMBINATION",
              game: currentGame,
              con: con,
              player: p,
            }
            m = JSON.stringify(info);
            ws.send(m);
          }
        }
        else if (key === "WON") {
          var p = (con === currentGame.player1) ? currentGame.player2 : currentGame.player1;
          var info = {
            message: "LSR_YOU_LOST_THE_GAME",
            game: currentGame,
            con: con,
            player: p,
          };
          p.send(JSON.stringify(info));
          info.message = "GG_But it's over now.";
          currentGame.messageToPlayers(JSON.stringify(info));
        }
        else if (key === "IGU") {
          var loser = (con === currentGame.player1) ? currentGame.player1 : currentGame.player2;
          var winner = (con === currentGame.player1) ? currentGame.player2 : currentGame.player1;
          var infoL = {
            message: "GO_GAME_OVER",
            game: currentGame,
            con: con,
            player: loser
          };
          loser.send(JSON.stringify(infoL));

          var infoW = {
            message: "WBD_PLAYER_WON_BY_DEFAULT",
            game: currentGame,
            con: con,
            player: winner
          };
          winner.send(JSON.stringify(infoW));

        }
        else {
          ws.send("Yup, got it. --Your server.");
        }
      
    });

    //console.log("\nPlayer %s placed in game %s\n", player, currentGame.gameID);
});

server.listen(port, function (){
  console.log("Server Started. Listening on port " + port + "...");
});


