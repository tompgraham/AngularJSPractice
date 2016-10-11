/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var TimerDriver = angular.module("MeasuringApp", ["CSS450Timer"]);

TimerDriver.controller("TimerCtrl", function ($scope)
{
    $scope.timerDisplay = "";
    $scope.timerValue = 0;
    $scope.timerEnabled = false;
    
    $scope.timerUpdate = function () 
    {
        
        $scope.timerValue += 1;
        $scope.timerDisplay = $scope.timerValue;
    };
 
 
    $scope.toggleTimer = function ()
    {
        
        if ($scope.timerEnabled === false)
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
