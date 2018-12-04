var c = require("./Color");

/* Constructor.
Parameters are 4 Color objects. */
function Four_colors(colorA, colorB, colorC, colorD) {
    this.Four_colors1 = colorA;
    this.Four_colors2 = colorB;
    this.Four_colors3 = colorC;
    this.Four_colors4 = colorD;
};

// Try to construct the array using a forloop (#askTA)
// function Four_colors(color1, color2, color3, color4) {
//     for (var i = 0; i <= 3; i ++) {
//         var colori = "color";
//         colori = colori + i;
//     Four_colors[i] = colori;
// };

/* Sets a new color for the given position i.
Throws an error if i is out of bounds for the array. */
Four_colors.prototype.setColori = function(i, newColor) {
    if (i > 3) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 3.");
    }
    Four_colors[i] = newColor;
};

/* Gets the color for the given position i.
Throws an error if i is out of bounds for the array. */
Four_colors.prototype.getColori = function(i) {
    if (i > 3) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 3.");
    }
    return Four_colors[i];
};

/* Resets all the colors to standardColor. */
Four_colors.prototype.resetAll = function() {
    for(var i = 0; i <= 3; i++) {
        Four_colors.setColori(i, standardColor);
    }
};

/* Generates a random combination of 4 distinct Color objects and returns these as a Four_colors object. */
Four_colors.prototype.generateRandomCombination = function() {
    
    var rC = new c("a");
    var rColor1 = rC.generateRandom();
    var rColor2; var rColor3; var rColor4;
    do {
        //console.log("a");
        rColor2 = rC.generateRandom();
    } while (rColor2 === rColor1);
    do {
        rColor3 = rC.generateRandom();
    } while (rColor3 === rColor1 || rColor3 === rColor2);
    do {
        rColor4 = rC.generateRandom();
    } while (rColor4 === rColor1 || rColor4 === rColor2 || rColor4 === rColor3);
    var rCombination = new Four_colors(rColor1, rColor2, rColor3, rColor4);
    return rCombination;
};

/* Checks if all four colors (in order) of the objects are the same.
Returns true if they are, else it returns false. */
Four_colors.prototype.equals = function(Other) {
    if(Other instanceof Four_colors){
        for(var i = 0; i <= 3; i++) {
            if (!Four_colors.getColori(i).equals(Other.getColori(i))){
                return false;
            }
        }
        return true;
    }
    return false;
};

/* Returns the amount of colors that were guessed correctly, but are still in the wrong position */
Four_colors.prototype.colorsCorrect = function(Solution) {
    var numCorr = 0;
    for(var i = 0; i <= 3; i++) {
        for(var j = 0; j <= 3; j++) {
            if(Four_colors.getColori(i).equals(Solution.getColori(j))) {
                numCorr++;
            }
        }
    }
    return (numCorr-Four_colors.placesCorrect(Solution));
}

/* Returns the amount of colors that are in the correct position */
Four_colors.prototype.placesCorrect = function(Solution) {
    var plaCorr = 0;
    for(var i = 0; i <= 3; i++) {
        if(Four_colors.getColori(i).equals(Solution.getColori(i))) {
            plaCorr++;
        }
    }
    return plaCorr;
}

module.exports = Four_colors;