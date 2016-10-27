/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global ClassExample, SquareRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

ClassExample.prototype.currentObject = function () {
    return this.mCurrentObject;
};

ClassExample.prototype.defineCenter = function (x, y, shape, eraseMode) {
    if (!eraseMode)
    {
        if (shape == 0)
        {
            this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
        }
        if (shape == 1)
        {
            this.mCurrentObject = new CircleRenderable(this.mConstColorShader);
        }

        this.mCurrentObject.setColor([Math.random(), Math.random(), Math.random(), 1]);
        var xf = this.mCurrentObject.getXform();
        xf.setXPos(x);
        xf.setYPos(y);
        xf.setSize(2, 2);
        this.mAllObjects.push(this.mCurrentObject);
        return xf;  // returns the reference to the current xform
    }
    if (eraseMode)
    {
        this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
        this.mCurrentObject.setColor([255,255,255,1])
        var xf = this.mCurrentObject.getXform();
        xf.setXPos(x);
        xf.setYPos(y);
        xf.setSize(20, 20);
        this.eraser = this.mCurrentObject
        return xf;  // returns the reference to the current xform
    }
};

// from center to current position is 1/2 of width
ClassExample.prototype.defineWidth = function (x, y) {
    var xf = this.mCurrentObject.getXform();
    var dx = Math.abs(x - xf.getXPos());
    var dy = Math.abs(y - xf.getYPos());
    xf.setSize(dx*2, dy*2);
};