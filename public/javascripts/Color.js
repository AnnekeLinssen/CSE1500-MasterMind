var standardColor = "white";

/* Constructor */
function Color() {
    this.color = standardColor;
};

/* Sets the color of the object to the new input */
Color.prototype.setColor = function(newColor) {
        this.color = newColor;
};

/* Returns the color of the object */
Color.prototype.getColor = function() {
        return this.color;
};

/* Resets the color to the standard (white) */
Color.prototype.resetColor = function() {
        this.color = standardColor;
};

/* Generates a random number representing a color. */
Color.prototype.generateRandom = function() {
    var rColor = new Color("a");
    var shade = "bahur";
    var number = (Math.floor(Math.random()*8 + 1));
    //console.log(number);
    return number
};

/* Checks if the color of the objects is the same.
Returns true if they are equal, else returns false. */
Color.prototype.equals = function(Other) {
    if (Other instanceof Color) {
        return this.getColor() === Other.getColor();
    }
    else {
        return false;
    }
};

module.exports = Color;