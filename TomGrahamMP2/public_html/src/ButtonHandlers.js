/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

var myModule = angular.module("MyApp", []);

myModule.controller('myCtrl', function($scope)
{
    $scope.units =
        [
            {unit : "Pixel"},
            {unit : "Millimeters"},
            {unit : "Centimeters"},
            {unit : "Meters"}
        ];
});