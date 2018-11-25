/* Constructor */
var fc = require(Four_colors);

function Game(player) {
    this.gameID = GameStats.newGameID;
    this.player1 = player;
    this.player2;
    this.combination;
    this.previousGuesses1;
    this.previousGuesses2;
    this.playable = false;
};

Game.prototype.getCombination = function() {
    return this.combination;
};

Game.prototype.setCombination = function(combination) {
    Game.combination = combination;
};

Game.prototype.generateCombination = function() {
    var combination = Four_colors.generateRandomCombination();
};

Game.prototype.startGame = function() {
    this.gameID = GameStats.newGameID();
    this.player2 = 
    Game.generateCombination();
    Game.previousGuesses1 = new PreviousGuesses();
    Game.previousGuesses2 = new PreviousGuesses();
    this.playable = true;
};

Game.prototype.isPlayable = function() {
    return this.playable;
};

