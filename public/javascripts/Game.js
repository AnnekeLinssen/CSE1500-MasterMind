var fc = require('./Four_colors ([4])');
var GameStats = require("./GameStats");
var PreviousGuesses = require("./Previous_guesses ([10[4]])");

/* Constructor.
Has as a parameter the playerID for player1. */
function Game(player, gameID) {
    this.gameID = gameID;
    this.player1 = player;
    this.player2 = null;
    this.combination = "still unset";
    this.previousGuesses1 = new PreviousGuesses();
    this.previousGuesses2 = new PreviousGuesses();
    this.playable = false;
    this.p1Selected = "undefined";
    this.p2Selected = "undefined";
    this.currentGuessP1 = [0,0,0,0];
    this.currentGuessP2 = [0,0,0,0];
};

Game.prototype.clearPlayerGuess = function (p) {
    if (p === this.player1) {
        this.currentGuessP1 = [0,0,0,0];
    }
    else if ( p === this.player2) {
        this.currentGuessP2 = [0,0,0,0];
    }   
}

Game.prototype.getCurrentGuessP1 = function () {
    return this.currentGuessP1;
};

Game.prototype.getCurrentGuessP2 = function () {
    return this.currentGuessP2;
};

Game.prototype.setCurrentGuessP1 = function (p, g) {
    this.currentGuessP1[p] = g;
};

Game.prototype.setCurrentGuessP2 = function (p, g) {
    this.currentGuessP2[p] = g;
};
/* Returns the combination of the Game. */
Game.prototype.getCombination = function() {
    return this.combination;
};

/* Sets the combination of the Game. */
Game.prototype.setCombination = function(combination) {
    this.combination = combination;
};

Game.prototype.getPSelected = function (p) {
    if (p === "A") {
        return this.p1Selected;
    }
    else if (p === "B") {
        return this.p2Selected;
    }
    return "undefined";
}

Game.prototype.setPSelected = function (p, s) {
    if (p === this.player1) {
        this.p1Selected = s;
    }
    else if (p === this.player2) {
        this.p2Selected = s;
    }
}

/* Generates a random combination of four distinct Colors. */
Game.prototype.generateCombination = function() {
    var combination = fc.generateRandomCombination();
    return combination;
};

/* Takes as a parameter the second player and assigns this to the game.
Then creates a gameID and assigns a random combination.
Initilises the empty arrays of PreviousGuesses.
Sets playable to true. */
Game.prototype.startGame = function(player) {
    // this.gameID = GameStats.newGameID();
    
    this.player2 = player;
    //console.log("2");
    var rCom = new fc("a", "b", "c", "d");
    //console.log("3");
    this.combination = rCom.generateRandomCombination();
    //console.log("4");
    this.playable = true;
};

Game.prototype.isPlayable = function() {
    return this.playable;
};

Game.prototype.getPlayerOne = function () {
    return this.player1;
}

Game.prototype.getPlayerTwo = function () {
    return this.player2;
}

Game.prototype.getPlayer = function (p) {
    if (p === this.player1){
        return this.player1;
    }
    else if (p === this.player2) {
        return this.player2;
    }
    return undefined;
};

Game.prototype.messageBothPlayers = function (message, p1, p2) {

    this.player1.send(message + p2.toString());
    this.player2.send(message + p1.toString());
};

Game.prototype.messageToPlayers = function (message) {

    this.player1.send(message);
    this.player2.send(message);
    console.log("[G LOG]" + message);
};

/* Returns the amount of colors that were guessed correctly, but are still in the wrong position */
Game.prototype.colorsCorrect = function(guess, combination) {
    var numCorr = 0;
    for(var i = 0; i <= 3; i++) {
        for(var j = 0; j <= 3; j++) {
            if(guess[i] == combination[j]) {
                numCorr++;
            }
        }
    }
    return numCorr;
};

Game.prototype.placesCorrect = function (guess, combination) {
    var numCorr = 0;
    for(var i = 0; i < 4; i++) {
        if (guess[i] == combination[i]) {
            numCorr++;
        }
    }
    return numCorr;
};

module.exports = Game;