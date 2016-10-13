/* 
 * Created by Tom Graham 10/9/16 for CSS 450 UW Bothell
 * Driver for MP2 program
 */

"use strict";

var TimerDriver = angular.module("MeasuringApp", ["CSS450Timer", "CSS450Slider"]);



TimerDriver.controller("myCtrl", function ($scope)
{
    
    //Units and their respective scale
    $scope.units =
    [
        {unit : "Pixel", scale: 1},
        {unit : "Millimeters", scale: 5},
        {unit : "Centimeters", scale: 10},
        {unit : "Meters", scale: 50}
    ];
    
    //Model variables
    $scope.timerDisplay = "";
    $scope.timerValue = 0;
    $scope.timerEnabled = false;
    $scope.currentState = "Measurement Disabled";
    $scope.selectedUnit = $scope.units[0];
    $scope.distance = 0;
    $scope.SliderValue = 1;
    $scope.scaledDistance = $scope.SliderValue * $scope.distance;
    
    var clickList = [];
    
    
    
    //serviceDown
    //Function to service mouse clicks
    $scope.serviceDown = function (event)
    {
        
        //Check if left button is clicked
        if (event.button === 0)
        {
              var click = new clickInfo(event.pageX, event.pageY);
              clickList.push(click);
              
              $scope.xCoordLMB = event.pageX;
              $scope.yCoordLMB = event.pageY;
              
              $scope.currentState = "Measuring in Progress: Number of LMB Click: " + clickList.length;
        }
        
        //Check if right button is clicked
        if (event.button === 2)
        {
            $scope.distance = 0;
            $scope.currentState = "Measuring Finished: Total Number of Clicks: " + clickList.length;
            for(var i = 0; i < clickList.length - 1; i++)
            {
                var sideA = clickList[i].xcoord - clickList[i+1].xcoord;
                var sideB = clickList[i].ycoord - clickList[i+1].ycoord;
                $scope.distance += Math.sqrt(sideA * sideA + sideB * sideB);
            }
            $scope.scaledDistance = $scope.SliderValue * $scope.distance;
            clickList = [];
            
        }
    };
    
    //serviceMove
    //Fuction to keep track of mouse movements
    $scope.serviceMove = function (event)
    {
        $scope.xCoordCurrent = event.pageX;
        $scope.yCoordCurrent = event.pageY;
    };
    
    //timerUpdate
    //Function called as a result of timer callback
    $scope.timerUpdate = function () 
    {
        if ($scope.timerEnabled)
        {
            $scope.timerValue += 1;
            $scope.timerDisplay = $scope.timerValue;            
        }
        
    };
 
    //toggleTimer
    //Function to toggle timer between on/off states and reflect this
    //in the gui
    $scope.toggleTimer = function ()
    {
        if (!$scope.timerEnabled)
        {
            $scope.timerEnabled = true;
            $scope.$broadcast("timer-started");
            $scope.currentState = "Measuring in Progress: before first click";
        }
        else
        {
            $scope.timerEnabled = false;
            $scope.timerValue = 0;
            $scope.timerDisplay = $scope.timerValue;
            $scope.$broadcast("timer-stopped"); 
            $scope.currentState = "Measurement Disabled";
            
            $scope.xCoordLMB = "";
            $scope.yCoordLMB = "";

            $scope.xCoordCurrent = "";
            $scope.yCoordCurrent = "";
            
            clickList = [];
        }

    };
    
    //serviceSlider
    //Function called in the callback of the slider to change units and scale
    $scope.serviceSlider = function()
    {
        if ($scope.SliderValue >= 0 && $scope.SliderValue < 5)
        {
            $scope.selectedUnit = $scope.units[0];
        }
        
        if ($scope.SliderValue >= 5 && $scope.SliderValue < 10)
        {
            $scope.selectedUnit = $scope.units[1];
        }
        
        if ($scope.SliderValue >= 10 && $scope.SliderValue < 50)
        {
            $scope.selectedUnit = $scope.units[2];
        }
        
        if ($scope.SliderValue >= 50)
        {
            $scope.selectedUnit = $scope.units[3];
        }
        
        $scope.scaledDistance = $scope.SliderValue * $scope.distance;
    };

    //serviceRadio
    //Function called by radio button to change the slider model
    $scope.serviceRadio = function()
    {
        $scope.SliderValue = $scope.selectedUnit.scale;
        $scope.scaledDistance = $scope.SliderValue * $scope.distance;
    };
});
