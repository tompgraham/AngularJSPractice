/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClassExample() {
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader


    this.mCurrentObject = null;
    this.mParent = new SceneNode(this.mConstColorShader, true);
    
    this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
    this.mCurrentObject.setColor([1, 0.25, 0.25, 1]);

    this.mCurrentObject.getXform().setPosition(0, 0);
    this.mCurrentObject.getXform().setSize(10, 10);
    
    this.mAllObjects = [];
    this.mAllObjects.push(this.mCurrentObject);
    
    
    this.viewPortSquare = new SquareArea(this.mConstColorShader, true);
    
    this.wcSquare = new SquareArea(this.mConstColorShader, true);
    
    
//    this.mElement = new SquareRenderable(this.mConstColorShader);
//    this.mParent.addToSet(this.mElement);
//    var xf = this.mElement.getXform();
//    xf.setSize(4, 2);
//    
//    var obj = new SquareRenderable(this.mConstColorShader);
//    this.mParent.addToSet(obj);
//    obj.setColor([0, 0, 1, 1]);
//    xf = obj.getXform();
//    xf.setSize(1.9, 1.9); // so that we can see the connecting point
//    xf.setPosition(3, 0);
//    
//    xf = this.mParent.getXform();
//    xf.setPivot(2, 0);
}

ClassExample.prototype.draw = function (camera, mainCamera) {

    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();

//    this.mParent.draw(camera);
    
    var i;
    for (i=0; i<this.mAllObjects.length; i++)
        this.mAllObjects[i].draw(camera);
    
    if (mainCamera)
    {
        this.viewPortSquare.draw(camera);
        this.wcSquare.draw(camera);
    }
    
};

ClassExample.prototype.setSquareArea = function(viewPortSquare,posX,posY,width,height,color)
{
    if (viewPortSquare)
    {
        this.viewPortSquare.setArea(posX,posY,width,height,[0,0,1,1]);
    }
    else
    {
        this.wcSquare.setArea(posX,posY,width,height,[1,1,1,1]);
    }
};


ClassExample.prototype.elementXform = function () {
    return this.mElement.getXform();
};

ClassExample.prototype.parentXform = function () {
    return this.mParent.getXform();
};
