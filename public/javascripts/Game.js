var fc = require('./Four_colors ([4])');
var GameStats = require("./GameStats");
var PreviousGuesses = require("./Previous_guesses ([10[4]])");

/* Constructor.
Has as a parameter the playerID for player1. */
function Game(player, gameID) {
    this.gameID = gameID;
    this.player1 = player;
    this.player2;
    this.combination;
    this.previousGuesses1;
    this.previousGuesses2;
    this.playable = false;
};

/* Returns the combination of the Game. */
Game.prototype.getCombination = function() {
    return this.combination;
};

/* Sets the combination of the Game. */
Game.prototype.setCombination = function(combination) {
    this.combination = combination;
};

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
    console.log("2");
    var rCom = new fc("a", "b", "c", "d");
    console.log("3");
    this.combination = rCom.generateRandomCombination();
    console.log("4");
    this.previousGuesses1 = new PreviousGuesses();
    console.log("5");
    this.previousGuesses2 = new PreviousGuesses();
    console.log("6");
    this.playable = true;
    console.log("7");
};

Game.prototype.isPlayable = function() {
    return this.playable;
};

module.exports = Game;