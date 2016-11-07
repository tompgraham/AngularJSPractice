/* 
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, Camera, CanvasMouseSupport */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

// Creates the "backend" logical support for appMyExample
var myModule = angular.module("appMyExample", ["CSS450Timer", "CSS450Slider", "CSS450Xform"]);

// registers the constructor for the controller
// NOTE: the constructor is only called _AFTER_ the </body> tag is encountered
//       this code does NOT run until the end of loading the HTML page
myModule.controller("MainCtrl", function ($scope) {
    // Initialize the graphics system
    gEngine.Core.initializeWebGL('GLCanvas');
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas');
    
    // All the mouse coordinate points
    $scope.mClientX = 0;
    $scope.mClientY = 0;
    $scope.mCanvasX = 0;
    $scope.mCanvasY = 0;
    $scope.mViewportX = 0;
    $scope.mViewportY = 0;
    $scope.mCameraX = 0;
    $scope.mCameraY = 0;
    $scope.mWhichCamera = "Large";

       // this is the model
    $scope.mMyWorld = new ClassExample();

    $scope.mView = new Camera(
                [0, 0],         // wc Center
                200,                // wc Wdith
                [0, 0, 800, 600]);  // viewport: left, bottom, width, height
            
    // small view support
    $scope.setSmallViewWC = function () {
        $scope.mSmallView.setWCWidth(parseInt($scope.mSmallViewWCWidth));
    };
    $scope.setSmallViewWCCenter = function () {
        $scope.mSmallView.setWCCenter(
            parseInt($scope.mSmallViewWCCenter[0]),
            parseInt($scope.mSmallViewWCCenter[1])
        );
    };
    $scope.setSmallViewport = function () {
        var v = $scope.mSmallView.getViewport();
        var i;
        for (i=0; i<4; i++)
            v[i] = parseInt($scope.mSmallViewport[i]);
    };
    $scope.mSmallViewWCWidth = 30;
    $scope.mSmallViewport = [100, 200, 200, 200];
    $scope.mSmallViewWCCenter = [-5, -10];
    $scope.mSmallView = new Camera(
                [0, 0],// wc Center
                10, // wc width
                [0, 0, 100, 100]);    // viewport: left, bottom, width, height
    $scope.mSmallView.setBackgroundColor([0.9, 0.7, 0.7, 1]);
    $scope.setSmallViewWC();
    $scope.setSmallViewWCCenter();
    $scope.setSmallViewport();

    $scope.mMyWorld.setSquareArea(false, -20,10,200,200);

    $scope.mMyWorld.setSquareArea(true, $scope.mSmallViewWCCenter[0],$scope.mSmallViewWCCenter[1],
            $scope.mSmallViewWCWidth, $scope.mSmallViewWCWidth);

    $scope.mainTimerHandler = function () {
        // Step E: Clear the canvas
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas
        //
        // $scope.mMyWorld.update();
        $scope.mMyWorld.setSquareArea(true, $scope.mSmallViewWCCenter[0],$scope.mSmallViewWCCenter[1],
            $scope.mSmallViewWCWidth, $scope.mSmallViewWCWidth);
        
       // $scope.mMyWorld.setSquareArea(false, 5,5,10,10);
        
        $scope.mMyWorld.draw($scope.mView, true);

        $scope.mMyWorld.draw($scope.mSmallView, false);
       
    };

    $scope.computeWCPos = function (event) {
        var wcPos = [0, 0];
        $scope.mClientX = event.clientX;
        $scope.mClientY = event.clientY;
        
        $scope.mCanvasX = $scope.mCanvasMouse.getPixelXPos(event);
        $scope.mCanvasY = $scope.mCanvasMouse.getPixelYPos(event);
        var useCam = $scope.mView; // assume using this camera
        $scope.mWhichCamera = "Large";
        if ($scope.mSmallView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
            useCam = $scope.mSmallView;
            $scope.mWhichCamera = "Small";
        }
        
        // these are "private functions" on the camera, 
        // for the purpose of clear illustration, we will call them
        $scope.mViewportX = useCam._viewportX($scope.mCanvasX);
        $scope.mViewportY = useCam._viewportY($scope.mCanvasY);
        
        wcPos[0] = useCam.mouseWCX($scope.mCanvasX);
        wcPos[1] = useCam.mouseWCY($scope.mCanvasY);
        $scope.mCameraX = wcPos[0];
        $scope.mCameraY = wcPos[1];
        return wcPos;
    };

    // Mouse support for creation of objects
    $scope.defineSquare = function (event) {
        var wcPos = $scope.computeWCPos(event);
        $scope.mMyWorld.defineCenter(wcPos);
        $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();
    };

    $scope.dragSquare = function (event) {
        var wcPos;
        var wcPos = $scope.computeWCPos(event);
        
        // console.log("dragging");
        switch (event.which) {
        case 1: // left
            $scope.mMyWorld.defineWidth(wcPos);
            break;
        }
    };

});