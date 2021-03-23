"use strict";

function main(input, projection, transform) {
    // Get A WebGL context
    console.log(transform)
    /** @type {HTMLCanvasElement} */
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // setup GLSL program
    // setup GLSL program
    const vsSource = document.getElementById("vertex-shader-3d").text;
    const fsSource = document.getElementById("fragment-shader-3d").text;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var normalLocation = gl.getAttribLocation(program, "a_normal");

    // lookup uniforms
    var worldViewProjectionLocation = gl.getUniformLocation(
        program,
        "u_worldViewProjection"
    );
    var worldInverseTransposeLocation = gl.getUniformLocation(
        program,
        "u_worldInverseTranspose"
    );
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var reverseLightDirectionLocation = gl.getUniformLocation(
        program,
        "u_reverseLightDirection"
    );

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    if (input.shape === "cube") {
        setCubeVertices(gl, input.outer, input.inner);
    }

    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    
    if (input.shape === "cube") {
        setCubeNormals(gl);
    }

    function radToDeg(r) {
        return (r * 180) / Math.PI;
    }

    function degToRad(d) {
        return (d * Math.PI) / 180;
    }

    var fieldOfViewRadians = degToRad(70);
    var scale = transform[3];
    var translation = [transform[4], transform[5], transform[6]];
    translation = translation.map(item => -1*parseInt(item))
    var rotation = [degToRad(transform[0]), degToRad(transform[1]), degToRad(transform[2])]

    drawScene();

    function drawScene() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var size = 3; 
        var type = gl.FLOAT; 
        var normalize = false; 
        var stride = 0; 
        var offset = 0; 
        gl.vertexAttribPointer(
            positionLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );

        gl.enableVertexAttribArray(normalLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

        var size = 3; 
        var type = gl.FLOAT; 
        var normalize = false; 
        var stride = 0; 
        var offset = 0; 
        gl.vertexAttribPointer(
            normalLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );

        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var projectionMatrix = m4.perspective(
            fieldOfViewRadians,
            aspect,
            zNear,
            zFar
        );

        projectionMatrix = m4.scale(projectionMatrix, scale, scale, 1)

        var camera = [0, 250, 500];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(camera, target, up);
        cameraMatrix = m4.translate(cameraMatrix, translation[0], translation[1], translation[2]);
        cameraMatrix = m4.scale(cameraMatrix, 1, 1, 1);
        var viewMatrix = m4.inverse(cameraMatrix);
        var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
        
        var worldMatrix = m4.xRotation(rotation[0]);
        worldMatrix = m4.yRotate(worldMatrix, rotation[1]);
        worldMatrix = m4.zRotate(worldMatrix, rotation[2]);

        var worldViewProjectionMatrix = m4.multiply(
            viewProjectionMatrix,
            worldMatrix
        );
        var worldInverseMatrix = m4.inverse(worldMatrix);
        var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);

        gl.uniformMatrix4fv(
            worldViewProjectionLocation,
            false,
            worldViewProjectionMatrix
        );
        gl.uniformMatrix4fv(
            worldInverseTransposeLocation,
            false,
            worldInverseTransposeMatrix
        );

        if (input.color) {
            const {r,g,b} = input.color
            gl.uniform4fv(colorLocation, [r,g,b, 1]); 
        } else {
            gl.uniform4fv(colorLocation, [1,0,0, 1]); 
        }

        gl.uniform3fv(
            reverseLightDirectionLocation,
            m4.normalize([0.5, 0.7, 1])
        );

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 200 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}

