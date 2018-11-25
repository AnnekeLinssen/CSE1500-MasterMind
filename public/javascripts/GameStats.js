/* Constructor */
function GameStats() {
    this.totalGames = 0;
    this.totalPlayers = 0;
    this.latestGame;
};

/* Increments totalGames by 1. */
GameStats.incrGame = function() {
    totalGames = totalGames + 1;
};

/* Returns a new gameID (equal to totalGames) and increments totalGames by 1. */
GameStats.newGameID = function() {
    GameStats.incrGame();
    return totalGames;
};

/* Increments totalPlayers by 1. */
GameStats.addPlayer = function() {
    totalPlayers = totalPlayers + 1;
};

/* Returns a new playerID (equal to totalPlayers) and increments totalPlayers by 1. */
GameStats.newPlayerID = function() {
    GameStats.totalPlayers.addPlayer();
    return totalPlayers;
};

/* Returns true if there is another player available to play a game.
Else returns false. */
GameStats.isPlayerAvailable = function() {
    if(totalPlayers % 2 == 0) {
        return false;
    }
    return true;
};


