/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Renderable(shader) {
    this.mShader = shader;         // the shader for shading this object
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel
}

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
Renderable.prototype.draw = function (camera) {};

Renderable.prototype.getXform = function () { return this.mXform; };
Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };

Renderable.prototype.mayHaveCollided = function(other) { // other is anotehr Renderable
    var myXf = this.getXform();
    var urXf = other.getXform();
    // pretend xf.mScale contains the radius;
    var myR = Math.min(myXf.getWidth(), myXf.getHeight());
    var urR = Math.min(urXf.getWidth(), urXf.getHeight());
    var rDist = myR*myR + urR*urR;

    var dx = myXf.getXPos() - urXf.getXPos();
    var dy = myXf.getYPos() - urXf.getYPos();
    var distBetweenCenter = dx*dx + dy*dy;

    return distBetweenCenter < rDist;
};
//--- end of Public Methods
//</editor-fold>
