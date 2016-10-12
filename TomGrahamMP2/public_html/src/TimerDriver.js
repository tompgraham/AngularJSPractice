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
    
    $scope.timerUpdate = function () 
    {
        
        $scope.timerValue += 1;
        $scope.timerDisplay = $scope.timerValue;
    };
 
 
    $scope.toggleTimer = function ()
    {
        console.log("we got here!");
        if (true)
        {
            
            $scope.timerEnabled = true;
            $scope.$broadcast("timer-started");
        }
        else
        {
            $scope.timerEnabled = false;
            $scope.timerValue = 0;
            $scope.$broadcast("timer-stopped"); 
        }

    }

});
