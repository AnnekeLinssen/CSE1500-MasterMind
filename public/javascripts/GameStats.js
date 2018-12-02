/* Constructor */
var GameStats = {
    totalGames: 0,
    totalPlayers: 0,
    /* Returns a new playerID (equal to totalPlayers) and increments totalPlayers by 1. */
    newPlayerID = function() {
        GameStats.totalPlayers.incrPlayer();
        return GameStats.totalPlayers;
    },
    /* Returns a new gameID (equal to totalGames) and increments totalGames by 1. */
    newGameID = function() {
        GameStats.incrGame();
        return GameStats.totalGames;
    },
    /* Returns true if there is another player available to play a game.
    Else returns false. */
    isPlayerAvailable = function() {
        if(GameStats.totalPlayers % 2 == 0) {
            return false;
        }
        return true;
    },
    /* Returns the totalGames. */
    getTotalGames = function() {
        return GameStats.totalGames;
    },
    /* Increments totalGames by 1. */
    incrGame = function() {
        GameStats.totalGames = GameStats.totalGames + 1;
    },
    /* Increments totalPlayers by 1. */
    incrPlayer = function() {
        GameStats.totalPlayers = GameStats.totalPlayers + 1;
    },
    /* Decrements totalPlayers by 1. */
    decrPlayer = function() {
        GameStats.totalPlayers = GameStats.totalPlayers - 1;
    }
};

module.exports = GameStats;