var fc = require('./Four_colors ([4])');
var GameStats = require("./GameStats");
var PreviousGuesses = require("./Previous_guesses ([10[4]])");

/* Constructor.
Has as a parameter the playerID for player1. */
function Game(player, gameID) {
    this.gameID = gameID;
    this.player1 = player;
    this.player2 = null;
    this.combination;
    this.previousGuesses1;
    this.previousGuesses2;
    this.playable = false;
    this.p1Selected = undefined;
    this.p2Selected = undefined;
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
    if (p === 1) {
        return this.p1Selected;
    }
    else if (p === 2) {
        return this.p2Selected;
    }
    return undefined;
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
    this.previousGuesses1 = new PreviousGuesses();
    //console.log("5");
    this.previousGuesses2 = new PreviousGuesses();
    //console.log("6");
    this.playable = true;
    //console.log("7");
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

Game.prototype.messageBothPlayers = function (message,p1, p2) {

    this.player1.send(message + p2.toString());
    this.player2.send(message + p1.toString());
};

module.exports = Game;