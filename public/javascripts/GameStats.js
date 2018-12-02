/* Constructor */
var GameStats = {
    totalGames: 0,
    totalPlayers: 0
};

/* Returns the totalGames. */
GameStats.getTotalGames = function() {
    return GameStats.totalGames;
}

/* Increments totalGames by 1. */
GameStats.incrGame = function() {
    GameStats.totalGames = GameStats.totalGames + 1;
};

/* Returns a new gameID (equal to totalGames) and increments totalGames by 1. */
GameStats.newGameID = function() {
    GameStats.incrGame();
    return GameStats.totalGames;
};

/* Increments totalPlayers by 1. */
GameStats.incrPlayer = function() {
    GameStats.totalPlayers = GameStats.totalPlayers + 1;
};

/* Decrements totalPlayers by 1. */
GameStats.decrPlayer = function() {
    GameStats.totalPlayers = GameStats.totalPlayers - 1;
}

/* Returns a new playerID (equal to totalPlayers) and increments totalPlayers by 1. */
GameStats.newPlayerID = function() {
    GameStats.totalPlayers.incrPlayer();
    return GameStats.totalPlayers;
};

/* Returns true if there is another player available to play a game.
Else returns false. */
GameStats.isPlayerAvailable = function() {
    if(GameStats.totalPlayers % 2 == 0) {
        return false;
    }
    return true;
};

module.exports = GameStats;