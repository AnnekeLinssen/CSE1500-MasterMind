/* Constructor */
var GameStats = {
    totalGames: 0,
    totalPlayers: 0
};

/* Returns the totalGames. */
GameStats.getTotalGames = function() {
    return totalGames;
}

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
GameStats.incrPlayer = function() {
    totalPlayers = totalPlayers + 1;
};

/* Decrements totalPlayers by 1. */
GameStats.decrPlayer = function() {
    totalPlayers = totalPlayers - 1;
}

/* Returns a new playerID (equal to totalPlayers) and increments totalPlayers by 1. */
GameStats.newPlayerID = function() {
    GameStats.totalPlayers.incrPlayer();
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

module.exports = GameStats;