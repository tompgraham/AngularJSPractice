/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function SquareArea(shader, drawPivot) {
    SceneNode.call(this, shader, drawPivot);
    this.mCurrentObject = new SquareRenderable(shader);
    this.mCurrentObject.setColor([1, 0.25, 0.25, 1]);

    this.mCurrentObject.getXform().setPosition(0, 0);
    this.mCurrentObject.getXform().setSize(10, 10);
    
    this.mElements.push(new SquareRenderable(shader));
    this.mElements.push(new SquareRenderable(shader));
    this.mElements.push(new SquareRenderable(shader));
    this.mElements.push(new SquareRenderable(shader));
    this.mElements.push(new SquareRenderable(shader));
}

gEngine.Core.inheritPrototype(SquareArea, SceneNode);

SquareArea.prototype.setArea = function (centerX, centerY, width, height, color)
{
    this.mElements[0].setColor(color);
    this.mElements[0].getXform().setPosition(centerX, centerY);
    this.mElements[0].getXform().setSize(1.6,1.6);
    
    this.mElements[1].setColor(color);
    this.mElements[1].getXform().setPosition(centerX - width/2, centerY);
    this.mElements[1].getXform().setSize(.8,height);
    
    this.mElements[2].setColor(color);
    this.mElements[2].getXform().setPosition(centerX + width/2, centerY);
    this.mElements[2].getXform().setSize(.8,height);
    
    this.mElements[3].setColor(color);
    this.mElements[3].getXform().setPosition(centerX, centerY + height/2);
    this.mElements[3].getXform().setSize(width,.8);
    
    this.mElements[4].setColor(color);
    this.mElements[4].getXform().setPosition(centerX, centerY - height/2, centerX);
    this.mElements[4].getXform().setSize(width,.8);
    
}