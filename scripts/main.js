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

    function radToDeg(r) {
        return (r * 180) / Math.PI;
    }

    function degToRad(d) {
        return (d * Math.PI) / 180;
    }

    var fieldOfViewRadians = degToRad(70);
    var fRotationRadians = degToRad(-20);

    drawScene();

    function updateRotation(event, ui) {
        fRotationRadians = degToRad(ui.value);
        drawScene();
    }

    // Draw the scene.
    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas AND the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Turn on culling. By default backfacing triangles
        // will be culled.
        gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the position attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
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

        // Turn on the normal attribute
        gl.enableVertexAttribArray(normalLocation);

        // Bind the normal buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

        // Tell the attribute how to get data out of normalBuffer (ARRAY_BUFFER)
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
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var projectionMatrix = m4.perspective(
            fieldOfViewRadians,
            aspect,
            zNear,
            zFar
        );

        // Compute the camera's matrix
        var camera = [0, 250, 500];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(camera, target, up);

        // Make a view matrix from the camera matrix.
        var viewMatrix = m4.inverse(cameraMatrix);

        // Compute a view projection matrix
        var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

        // Draw a F at the origin
        var worldMatrix = m4.yRotation(fRotationRadians);

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
        gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]); // green

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
