/*
 * File: EngineCore_VertexBuffer.js
 *  
 * defines the object that supports the loading and using of the buffer that 
 * contains vertex positions of a square onto the gGL context
 * 
 * Notice, this is a singleton object.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBufferCirc = (function () {
    // reference to the vertex positions for the square in the gl context
    var mCircVertexBuffer = null;
    var numVert = 51;

    // First: define the vertices for a square
    var verticesOfCircle = [
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0
    ];
    
   

    var initialize = function () {
        
        var gl = gEngine.Core.getGL();
        
        var radInterval = (2 * Math.PI) / numVert;
        
        for (var i = 0; i < numVert; i++)
        {
            var index = 2*3 + i*3;
            var angle = radInterval * (i+1);
            
            verticesOfCircle[index] = Math.cos(angle);
            verticesOfCircle[index+1] = Math.sin(angle);
            verticesOfCircle[index+2] = 0;
        }
        
        
        // Step A: Create a buffer on the gGL context for our vertex positions
        mCircVertexBuffer = gl.createBuffer();

        // Step B: Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mCircVertexBuffer);
        
        // Step C: Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfCircle), gl.STATIC_DRAW);
    };

    var getGLVertexRef = function () { return mCircVertexBuffer; };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };

    return mPublic;
}());