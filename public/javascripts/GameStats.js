/* Constructor */
function GameStats() {
    this.totalGames = 0;
    this.totalPlayers = 0;
    this.latestGame;
};

GameStats.addGame = function() {
    totalGames = totalGames + 1;
};

GameStats.newGameID = function() {
    GameStats.addGame();
    return totalGames;
};

GameStats.addPlayer = function() {
    totalPlayers = totalPlayers + 1;
};

GameStats.newPlayerID = function() {
    GameStats.totalPlayers.addPlayer();
    return totalPlayers;
};

GameStats.isPlayerAvailable = function() {
    if(totalPlayers % 2 == 0) {
        return false;
    }
    return true;
};


