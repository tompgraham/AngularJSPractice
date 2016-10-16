/* 
 * File: CSS450Slider.js
 * A slider utility   
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, Transform */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

angular.module("CSS450Xform", ["CSS450Slider"])
    .directive("cssXform", function () {
        return {
            template:  "\
             <div style=\" \
                display: inline-block;  \
                border-style:solid;     \
                border-width:thin;      \
                border-color: #111111;  \
                background-color: #FFEEEE\"> \
                <b>{{mLabel}}&nbsp;&nbsp; </b> \
            <label ng-repeat='myOp in eOpType'> \
                {{myOp.name}}<input type='radio' value={{myOp.code}}    \
                                     ng-model='$parent.mOpType' \
                                     ng-click='uiChangeOpType()'  \
                                     >&nbsp;    \
            </label>    \
            <br>   \
            <css-slider label='X/R' min='mMin' \
                                    max='mMax' \
                                    model='mX' callback='uiChangeObjX'></css-slider> \
            <br> \
            &nbsp;&nbsp;&nbsp;<css-slider label='Y' min='mMin' max='mMax'  \
                                          active='mOpType!=\"2\"' \
                                          model='mY' callback='uiChangeObjY'>\
                                                  </css-slider> \
            </div>",
                 
            scope: {
                mXform: "=model",        // binds to this Transform object
                mLabel: "=label",        // value of label around the div
                mNeedUpdate: "=update",  // bool to trigger redraw
                mCallback: "=callback"   // dirty call back
            },

            controller: function ($scope) {
                // set defaults
                if (!angular.isDefined($scope.mLabel))
                    $scope.mLabel = "";
                
                if (!angular.isDefined($scope.mXform))
                    $scope.mXform = new Transform();  // should not happen!
                
                  if (!angular.isDefined($scope.mNeedUpdate))
                    $scope.mNeedUpdate = false;  // should not happen!
                
                $scope.eOpType = [
                    {code: "0", name: "S"},
                    {code: "1", name: "T"},
                    {code: "2", name: "R"}
                ];
                
                $scope.initializeGUI = function (obj) {
                    $scope.mOpType = $scope.eOpType[0].code;
                    $scope.uiChangeOpType();
                };
                
                $scope.dirtyCallback = function() {
                    if (angular.isDefined($scope.mCallback))
                        $scope.mCallback();
                }

                // push mXform values to the UI
                $scope.redrawUI = function() {
                    $scope.objSetUI($scope.mXform);
                    $scope.mNeedUpdate = false;
                }
                
                $scope.objSetUI = function(obj) {
                    switch ($scope.mOpType) {
                    case "0":
                        $scope.mX = obj.getWidth();
                        $scope.mY = obj.getHeight();
                        break;
                    case "1":
                        $scope.mX = obj.getXPos();
                        $scope.mY = obj.getYPos();
                        break;
                    case "2":
                        $scope.mX = obj.getRotationInDegree();
                        break;
                    }
                };
                
                
                // pushes UI values to mXform
                $scope.uiChangeObjX = function () {
                    switch ($scope.mOpType) {
                    case "0":
                        $scope.mXform.setWidth($scope.mX);
                        break;
                    case "1":
                        $scope.mXform.setXPos($scope.mX);
                        break;
                    case "2":
                        $scope.mXform.setRotationInDegree($scope.mX);
                        break;
                    }
                    $scope.dirtyCallback();
                };

                $scope.uiChangeObjY = function () {
                    switch ($scope.mOpType) {
                    case "0":
                        $scope.mXform.setHeight($scope.mY);
                        break;
                    case "1":
                        $scope.mXform.setYPos($scope.mY);
                        break;
                    }
                    $scope.dirtyCallback();
                };

                $scope.uiChangeOpType = function () {
                    switch ($scope.mOpType) {
                    case "0": // scale
                        $scope.mMin = 1;
                        $scope.mMax = 100;
                        
                        $scope.mX = $scope.mXform.getWidth();
                        $scope.mY = $scope.mXform.getHeight();
                        break;
                    case "1": // translate
                        $scope.mMin = 0;
                        $scope.mMax = 800;
                        
                        $scope.mX = $scope.mXform.getXPos();
                        $scope.mY = $scope.mXform.getYPos();
                        break;

                    case "2": // translate
                        $scope.mMin = -360;
                        $scope.mMax = 360;
                        
                        $scope.mX = $scope.mXform.getRotationInDegree();
                        $scope.mY = 0;  // disabled because of binding for active
                        break;
                    }
                    $scope.dirtyCallback();
                };
                $scope.initializeGUI();
            },
            
            link: function (scope) {
               scope.$watch("mXform", function(newVar, oldVar) {
                   // console.log("CHANGES!!");
                   scope.objSetUI(newVar);
               });
               
               scope.$watch("mNeedUpdate", function(newVar, oldVar) {
                   // console.log("CHANGES!!");
                   scope.redrawUI();
               });
            },
        };
});