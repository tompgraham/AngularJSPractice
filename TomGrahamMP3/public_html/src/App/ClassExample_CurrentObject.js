/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global ClassExample */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

ClassExample.prototype.currentObject = function () {
    return this.mCurrentObject;
};

ClassExample.prototype.defineCenter = function (x, y) {
    var xf = this.mCurrentObject.getXform();
    xf.setXPos(x);
    xf.setYPos(y);
    xf.setSize(2, 2);
};

// from center to current position is 1/2 of width
ClassExample.prototype.defineWidth = function (x, y) {
    var xf = this.mCurrentObject.getXform();
    var dx = Math.abs(x - xf.getXPos());
    var dy = Math.abs(y - xf.getYPos());
    xf.setSize(dx*2, dy*2);
};
