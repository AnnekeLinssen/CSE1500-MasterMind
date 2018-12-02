var fc = require('./Four_colors ([4])');

/* Constructor.
Has as a parameter the playerID for player1. */
function Game(player) {
    this.gameID;
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
    var combination = Four_colors.generateRandomCombination();
    return combination;
};

/* Takes as a parameter the second player and assigns this to the game.
Then creates a gameID and assigns a random combination.
Initilises the empty arrays of PreviousGuesses.
Sets playable to true. */
Game.prototype.startGame = function(player) {
    this.gameID = GameStats.newGameID();
    this.player2 = player;
    Game.setCombination(Game.generateCombination());
    Game.previousGuesses1 = new PreviousGuesses();
    Game.previousGuesses2 = new PreviousGuesses();
    this.playable = true;
};

Game.prototype.isPlayable = function() {
    return this.playable;
};

module.exports = Game;