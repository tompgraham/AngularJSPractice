/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var myModule = angular.module("MyApp", []);

myModule.controller('myCtrl', function($scope)
{
    $scope.parties = 
    [
        {party : "Democratic"},
        {party : "Republican"},
        {party : "Libertarian"},
        {party : "Green"}
    ];
    
    $scope.candidates =
    [
        {cand : "Hillary Clinton", index : 0},
        {cand : "Donald Trump", index : 1},
        {cand : "Gary Johnson", index : 2},
        {cand : "Jill Stein", index : 3},
        {cand : "Darrell Castle... who?", index : 4}
    ]
    
    $scope.textInput = function (input)
    {
        $scope.selectedCand = $scope.candidates[input];
    };
});