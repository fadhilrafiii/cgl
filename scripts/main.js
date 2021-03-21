"use strict";

function main() {
    // Get A WebGL context
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

    // Create a buffer to put positions in
    var positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Put geometry data into buffer
    setGeometry(gl);

    // Create a buffer to put normals in
    var normalBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = normalBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // Put normals data into buffer
    setNormals(gl);

    // var fRotationRadians = degToRad(0);
    var scale = [1, 1, 1];
    var translation = [0, 0, 0];
    var rotation = [degToRad(10), degToRad(20), degToRad(40)]

    drawScene();

    // function updateRotation(event, ui) {
    //     fRotationRadians = degToRad(ui.value);
    //     drawScene();
    // }

    // Draw the scene.
    function drawScene() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var size = 3; // 3 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
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

        var size = 3; // 3 components per iteration
        var type = gl.FLOAT; // the data is 32bit floating point values
        var normalize = false; // normalize the data (convert from 0-255 to 0-1)
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(
            normalLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );

        // Compute the projection matrix
        // var projectionMatrix = orthographicProjection();
        var projectionMatrix = perspectiveProjection();
        // var projectionMatrix = obliqueProjection();

        // Compute the camera's matrix
        var camera = [0, 250, 500];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(camera, target, up);
        cameraMatrix = m4.translate(cameraMatrix, translation[0], translation[1], translation[2]);
        cameraMatrix = m4.scale(cameraMatrix, scale[0], scale[1], scale[2]);
        var viewMatrix = m4.inverse(cameraMatrix);
        var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
        

        // var worldMatrix = m4.xRotation(rotation[0]);
        var worldMatrix = m4.xRotation(rotation[0]);
        worldMatrix = m4.yRotate(worldMatrix, rotation[1]);
        worldMatrix = m4.zRotate(worldMatrix, rotation[2]);

        
        // Multiply the matrices.
        var worldViewProjectionMatrix = m4.multiply(
            viewProjectionMatrix,
            worldMatrix
        );
        var worldInverseMatrix = m4.inverse(worldMatrix);
        var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);

        // Set the matrices
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

        // Set the color to use
        gl.uniform4fv(colorLocation, [1, 0, 0, 1]); // green

        // set the light direction.
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

main();
