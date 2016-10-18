/* 
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, CanvasMouseSupport */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

// Creates the "backend" logical support for appMyExample
var myModule = angular.module("appMyExample", ["CSS450Timer", "CSS450Slider", "CSS450Xform"]);

// registers the constructor for the controller
// NOTE: the constructor is only called _AFTER_ the </body> tag is encountered
//       this code does NOT run until the end of loading the HTML page
myModule.controller("MainCtrl", function ($scope) {
       // this is the model
    $scope.mMyWorld = new ClassExample('GLCanvas');
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas');

    $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();
    $scope.mForceRedraw = false;

    $scope.redrawWorld = function () {
        $scope.mMyWorld.draw();
    };

    $scope.defineSquare = function (event) {
        $scope.mMyWorld.defineCenter(
            $scope.mCanvasMouse.getPixelXPos(event),
            $scope.mCanvasMouse.getPixelYPos(event));
        $scope.mForceRedraw = true;
        $scope.redrawWorld();
    };
    
    $scope.dragSquare = function (event) {
        // console.log("dragging");
        switch (event.which) {
        case 1: // left
            $scope.mMyWorld.defineWidth(
                $scope.mCanvasMouse.getPixelXPos(event),
                $scope.mCanvasMouse.getPixelYPos(event));
            $scope.mForceRedraw = true;
            $scope.redrawWorld();
            break;
        }
    };
    
    $scope.modeTransition = function (event)
    {
        if (event.button ===0)
        {
            $scope.clickMode = true;
        }
        if (event.button === 2)
        {
            $scope.clickMode = false;
        }
    }
    $scope.mMyWorld.draw();
});