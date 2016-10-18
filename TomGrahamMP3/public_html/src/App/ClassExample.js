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
    

    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Setup the camera
    this.mCamera = new Camera();

    // Step C: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
    
    // Step D: Create the Renderable objects:
    this.mCurrentObject = new Renderable(this.mConstColorShader);
    this.mCurrentObject.setColor([1, 0.25, 0.25, 1]);

    // The corners 
    // centre red square
    this.mCurrentObject.getXform().setPosition(400, 300);
    this.mCurrentObject.getXform().setSize(30, 30);
}

ClassExample.prototype.draw = function () {

    // Step E: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas

    // Step F: Starts the drawing by activating the camera
    this.mCamera.setupViewProjection();

    // centre red square
    this.mCurrentObject.draw(this.mCamera);
};