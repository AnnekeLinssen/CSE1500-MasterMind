var c = require(Color);

/* Constructor.
Parameters are 10 Color objects */
function Ten(colorA, colorB, colorC, colorD, colorE,
    colorF, colorG, colorH, colorI, colorJ) {
    Ten_colors[0] = colorA;
    Ten_colors[1] = colorB;
    Ten_colors[2] = colorC;
    Ten_colors[3] = colorD;
    Ten_colors[4] = colorE;
    Ten_colors[5] = colorF;
    Ten_colors[6] = colorG;
    Ten_colors[7] = colorH;
    Ten_colors[8] = colorI;
    Ten_colors[9] = colorJ;
};

// Possibly collapse [4] and [10] if we can get a flexible number of parameters.
// Also try to assign the array using a for-loop (#askTA)

/* Sets a new color for the given position i.
Throws an error if i is out of bounds for the array. */
Ten_colors.prototype.setColori = function(i, newColor){
    if (i > 9) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 9.");
    }
    Ten_colors[i] = newColor;
};

/* Gets the color for the given position i.
Throws an error if i is out of bounds for the array. */
Ten_colors.prototype.getColori = function(i){
    if (i > 9) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 9.");
    }
    return Ten_colors[i];
};

/* Resets all the colors to standardColor. */
Ten_colors.prototype.resetAll = function(){
    for(var i = 0; i <= 9; i++) {
        Ten_colors.setColori(i, standardColor);
    }
};

/* Checks if all ten colors (in order) of the objects are the same.
Returns true if they are, else it returns false. */
Ten_colors.prototype.equals = function(Other) {
    if(Other instanceof Ten_colors){
        for(var i = 0; i <= 9; i++) {
            if (!Ten_colors.getColori(i).equals(Other.getColori(i))){
                return false;
            }
        }
        return true;
    }
    return false;
};
