/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, Camera: false, mat4: false, vec3: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClassExample(htmlCanvasID) {
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    this.mCurrentObject = null;        // these are the Renderable objects
    this.mAllObjects = [];             // Initialize the array

    this.listEmpty = false;
    this.eraser = null;
    this.clicked = false;

    gEngine.Core.initializeWebGL(htmlCanvasID);

    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    // create first object

    this.defineCenter(.5, .5, 0, false);
}

ClassExample.prototype.draw = function (camera) {

            

    // Step E: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas

    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();

    var i;
    for (i=0; i<this.mAllObjects.length; i++)
        this.mAllObjects[i].draw(camera);
    if (this.eraser!=null)
    {
        this.eraser.draw(camera);
    }

};

ClassExample.prototype.getEmpty = function () {
    return this.listEmpty;
}

ClassExample.prototype.erase = function () {
    this.clicked = true;
}

ClassExample.prototype.update = function () {
    
    var i, xf;
    for (i=0; i<this.mAllObjects.length; i++) {
        xf = this.mAllObjects[i].getXform();
        xf.setYPos(xf.getYPos() - 1);
    }
    
    // now lets remove the ones fall beneath the screen
    for (i=this.mAllObjects.length-1; i>=0; i--) {
        xf = this.mAllObjects[i].getXform();
        if (xf.getYPos() < 0.0) {
            this.mAllObjects.splice(i, 1); // remove at i-position by 1
            
        }
    }
   
    if (this.eraser!= null && this.clicked == true)
    {
        var i;
        var j;
        for (j = this.mAllObjects.length-1; j>i; j--) {
            if (this.mAllObjects[j].mayHaveCollided(this.eraser)) {
                this.mAllObjects.splice(j, 1);
                this.clicked = false;
            }
        }
    }
        
    
    if (this.mAllObjects.length == 0)
    {
        this.listEmpty = true;
        this.eraser = null;
    }
    else
    {
        this.listEmpty = false;
    }
};