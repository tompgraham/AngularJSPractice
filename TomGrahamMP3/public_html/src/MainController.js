/* 
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, Camera, CanvasMouseSupport */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

// Creates the "backend" logical support for appMyExample
var myModule = angular.module("appMyExample", ["CSS450Timer", "CSS450Slider", "CSS450Xform", "colorpicker.module"]);

// registers the constructor for the controller
// NOTE: the constructor is only called _AFTER_ the </body> tag is encountered
//       this code does NOT run until the end of loading the HTML page
myModule.controller("MainCtrl", function ($scope) {
       // this is the model
       
    $scope.mMyWorld = new ClassExample('GLCanvas');
    $scope.mView = new Camera();
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas');

    $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();
    $scope.mForceRedraw = false;
    $scope.selectedShape = 0;
    $scope.eraseMode = false;
    $scope.drawMode = false;
    $scope.mMyWorld.initialize();
    

    $scope.mainTimerHandler = function () {

        $scope.mMyWorld.update();
        $scope.mForceRedraw = true;
        $scope.mMyWorld.draw($scope.mView);
        if ($scope.mMyWorld.getEmpty())
        {
            $scope.drawMode = false;
            $scope.eraseMode = false;
        }
        
            

    };

    $scope.enableEraseMode = function () {
        if ($scope.eraseMode == true && !$scope.mMyWorld.getEmpty())
        {
            $scope.drawMode = false;
            $scope.mMyWorld.toggleEraser();
            $scope.mMyWorld.resetErased();
        }
        else if ($scope.eraseMode == false && !$scope.mMyWorld.getEmpty())
        {
            $scope.drawMode = false;
            $scope.mMyWorld.toggleEraser();
        }else
        {
            $scope.eraseMode = false;
        }
    }

    $scope.changeColor = function (currentColor) 
    {
        var cur = currentColor.split("(");
        cur = cur[1].split(")");
        cur = cur[0].split(",")
        cur.push(1);
        cur[0] = cur[0]/255.0;
        cur[1] = cur[0]/255.0;
        cur[2] = cur[0]/255.0;
          
        $scope.mMyWorld.changeColor(cur);
    }
    
    $scope.serviceMouseDown = function (event) {
        if ($scope.drawMode == false && event.button == 0 && $scope.eraseMode == false)
        {
            $scope.drawMode = true;
        }
        if ($scope.drawMode == true && $scope.eraseMode == false)
        {
            $scope.mMyWorld.defineCenter(
                $scope.mCanvasMouse.getPixelXPos(event),
                $scope.mCanvasMouse.getPixelYPos(event),
                $scope.selectedShape);
            $scope.mForceRedraw = true;
        }
        if ($scope.eraseMode == true && event.button == 0)
        {
            $scope.mMyWorld.erase();
        }
        
        if (event.button == 2)
        {
            $scope.drawMode = false;
        }
    };

    $scope.dragSquare = function (event) {
        // console.log("dragging");
        if ($scope.drawMode == true && $scope.eraseMode == false)
        {
            switch (event.which) {
            case 1: // left
                $scope.mMyWorld.defineWidth(
                    $scope.mCanvasMouse.getPixelXPos(event),
                    $scope.mCanvasMouse.getPixelYPos(event));
                $scope.mForceRedraw = true;
                $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();
                break;
            }
        }
        if ($scope.eraseMode)
        {
                $scope.mMyWorld.defineCenter(
                $scope.mCanvasMouse.getPixelXPos(event),
                $scope.mCanvasMouse.getPixelYPos(event),
                $scope.selectedShape,
                true);
            $scope.mForceRedraw = true;
        }
        
        if ($scope.eraseMode == true && event.which == 1)
        {
            $scope.mMyWorld.erase();
        }
    };

});