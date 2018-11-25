
/* Constructor.
Parameters are 4 Color objects. */
function Four_colors(colorA, colorB, colorC, colorD) {
    Four_colors[0] = colorA;
    Four_colors[1] = colorB;
    Four_colors[2] = colorC;
    Four_colors[3] = colorD;
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
Four_colors.prototype.setColori = function(i, newColor){
    if (i > 3) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 3.");
    }
    Four_colors[i] = newColor;
};

/* Gets the color for the given position i.
Throws an error if i is out of bounds for the array. */
Four_colors.prototype.getColori = function(i){
    if (i > 3) {
        throw ("IndexOutOfBoundsException\n" +
        "The value of the index was " + i + ", but the maximum is 3.");
    }
    return Four_colors[i];
};

/* Resets all the colors to standardColor. */
Four_colors.prototype.resetAll = function(){
    for(var i = 0; i <= 3; i++) {
        Four_colors.setColori(i, standardColor);
    }
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
