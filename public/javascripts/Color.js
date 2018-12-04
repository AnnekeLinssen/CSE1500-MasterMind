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

/* Generates a random object Color with one of 8 colors. */
Color.prototype.generateRandom = function() {
    var rColor = new Color("a");
    var shade = "bahur";
    var number = (Math.floor(Math.random()*8 + 1));
    //console.log(number);
    switch(number) {
        case 1:
            shade = "brown";
            break;
        case 2:
            shade = "red";
            break;
        case 3:
            shade = "orange";
            break;
        case 4:
            shade = "yellow";
            break;
        case 5:
            shade = "green";
            break;
        case 6:
            shade = "turquoise";
            break;
        case 7:
            shade = "blue";
            break;
        case 8:
            shade = "purple";
            break;
        // case 9:
        //     shade = "pink";
        //     break;
        // case 10:
        //     shade = "grey";
        //     break;                 
    }
    rColor.setColor(shade);
    return number;
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