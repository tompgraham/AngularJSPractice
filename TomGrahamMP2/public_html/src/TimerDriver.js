/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var TimerDriver = angular.module("MeasuringApp", ["CSS450Timer"]);



TimerDriver.controller("myCtrl", function ($scope)
{
    $scope.timerDisplay = "";
    $scope.timerValue = 0;
    $scope.timerEnabled = false;
    

    
    
    $scope.units =
    [
        {unit : "Pixel"},
        {unit : "Millimeters"},
        {unit : "Centimeters"},
        {unit : "Meters"}
    ];
    
    $scope.serviceDown = function (event)
    {
        if (event.button === 0)
        {
            console.log("leftmousepressed");
        }
        
        if (event.button === 2)
        {
            console.log("rightmousepressed");
        }
    }
    
    $scope.serviceMove = function (event)
    {
        
    }
    
    $scope.timerUpdate = function () 
    {
        if ($scope.timerEnabled)
        {
            $scope.timerValue += 1;
            $scope.timerDisplay = $scope.timerValue;
        }
        
    };
 
 
    $scope.toggleTimer = function ()
    {
        if (!$scope.timerEnabled)
        {
            $scope.timerEnabled = true;
            $scope.$broadcast("timer-started");
        }
        else
        {
            $scope.timerEnabled = false;
            $scope.timerValue = 0;
            $scope.timerDisplay = $scope.timerValue;
            $scope.$broadcast("timer-stopped"); 
        }

    }

});
