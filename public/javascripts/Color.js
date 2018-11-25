var standardColor = "white";

/* Constructor */
function Color() {
    this.color = standardColor;
};

/* Sets the color of the object to the new input */
Color.prototype.setColor = function(newColor) {
        color = newColor;
};

/* Returns the color of the object */
Color.prototype.getColor = function() {
        return this.color;
};

/* Resets the color to the standard (white) */
Color.prototype.resetColor = function() {
        this.color = standardColor;
};

/* Checks if the color of the objects is the same. Returns true if they are, else it returns false. */
Color.prototype.equals = function(Other) {
    if (Other instanceof Color) {
        return this.getColor.equals(Other.getColor);
    }
    else {
        return false;
    }
};
