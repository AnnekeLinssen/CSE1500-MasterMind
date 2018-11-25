
/* Constructor */
function Four_colors(ColorA, ColorB, ColorC, ColorD) {
    Four_colors[0] = ColorA;
    Four_colors[1] = ColorB;
    Four_colors[2] = ColorC;
    Four_colors[3] = ColorD;
};

/* Sets a new color for the given position i */
Four_colors.prototype.setColori = function(i, newColor){
    Four_colors[i] = newColor;
};

/* Gets the color for the given position i */
Four_colors.prototype.getColori = function(i){
    return Four_colors[i];
};

/* Resets all the colors to the pre specified standard */
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