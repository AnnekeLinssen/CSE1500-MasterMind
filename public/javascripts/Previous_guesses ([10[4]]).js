var Color = require("./Color");
var standardColor = "white";
var Four_colors = require("./Four_colors ([4])");
/* Constructor.
Parameters are 10 Four_colors objects.*/
function PreviousGuesses () {
    this.attemptsMade = 0;
    var defaultColor = new Color(standardColor);
    // var defaultArray = new Four_colors(defaultColor, defaultColor, defaultColor, defaultColor);
    // for (var i = 0; i <= 9; i++) {
    //     this.PreviousGuesses[i] = defaultArray;
    this.PreviousGuesses = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    //}
};

/* Sets the new Four_colors for the given position i.
Throws an error if i is out of bounds for the array. */
PreviousGuesses.prototype.setAttempti = function(i, attempt) {
    if (i > 9) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 9.");
    }
    PreviousGuesses[i] = attempt;
};

/* Gets the Four_colors for the given position i.
Throws an error if i is out of bounds for the array. */
PreviousGuesses.prototype.getAttempti = function(i) {
    if (i > 9) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 9.");
    }
    return this.PreviousGuesses[i];
};

/* Increases the counter for the number of attempts made by 1.
This is a property of PreviousGuesses. */
PreviousGuesses.prototype.increaseAttempts = function() {
    this.attemptsMade = this.attemptsMade + 1;
};

/* Sets the new Four_colors for the next available spot in the array.
Throws an error if i is out of bounds for the array (10 guesses have been made). */
PreviousGuesses.prototype.setNextAttempt = function(attempt) {
    this.PreviousGuesses[this.attemptsMade] = attempt;
    this.attemptsMade++;
};


module.exports = PreviousGuesses;