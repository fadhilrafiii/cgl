"use strict";

function getShape() {
    let shapes = document.getElementsByName("shape");
    for (let i=0; i < shapes.length; i++) {
        if (shapes[i].checked==true) {
            // alert(shapes[i].value + ' you got a value');     
            return shapes[i].value;
        }
        
    }
}

function getXRotate() {
    let x = document.getElementsByName("x-rotate")[0].value;
    console.log(x);
    return x;
}

function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // setup GLSL program
    // setup GLSL program
    const vsSource = document.getElementById("vertex-shader-3d").text;
    const fsSource = document.getElementById("fragment-shader-3d").text;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // look up where the vertex data needs to go.
    let positionLocation = gl.getAttribLocation(program, "a_position");
    let normalLocation = gl.getAttribLocation(program, "a_normal");
    // lookup uniforms
    
    let worldViewProjectionLocation = gl.getUniformLocation(
        program,
        "u_worldViewProjection"
    );
    let worldInverseTransposeLocation = gl.getUniformLocation(
        program,
        "u_worldInverseTranspose"
    );
    
    let colorLocation = gl.getUniformLocation(program, "u_color");
    let reverseLightDirectionLocation = gl.getUniformLocation(
        program,
        "u_reverseLightDirection"
    );

    // Create a buffer to put positions in
    let positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Put geometry data into buffer
    let shape = getShape();
    setGeometry(gl, shape);
    console.log("mimi", positionBuffer)
    // Create a buffer to put normals in
    let normalBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = normalBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    // Put normals data into buffer
    setNormals(gl, shape);

    // var fRotationRadians = degToRad(0);
    let scale = [1, 1, 1];
    let translation = [0, 0, 0];
    let rotation = [degToRad(0), degToRad(0), degToRad(0)]


    // Draw the scene.
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    let size = 3; // 3 components per iteration
    let type = gl.FLOAT; // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0; // start at the beginning of the buffer
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
    let projectionMatrix = perspectiveProjection(gl);
    // var projectionMatrix = obliqueProjection();

    // Compute the camera's matrix
    let camera = [0, -250, 500];
    let target = [0, 0, 0];
    let up = [0, 1, 0];
    let cameraMatrix = m4.lookAt(camera, target, up);
    cameraMatrix = m4.translate(cameraMatrix, translation[0], translation[1], translation[2]);
    cameraMatrix = m4.scale(cameraMatrix, scale[0], scale[1], scale[2]);
    let viewMatrix = m4.inverse(cameraMatrix);
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // var worldMatrix = m4.xRotation(rotation[0]);
    let worldMatrix = m4.xRotation(rotation[0]);
    worldMatrix = m4.yRotate(worldMatrix, rotation[1]);
    worldMatrix = m4.zRotate(worldMatrix, rotation[2]);

    
    // Multiply the matrices.
    let worldViewProjectionMatrix = m4.multiply(
        viewProjectionMatrix,
        worldMatrix
    );
    let worldInverseMatrix = m4.inverse(worldMatrix);
    let worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);
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
    let primitiveType = gl.TRIANGLES;
    let geoOffset = 0;
    let count = 200 * 6;
    gl.drawArrays(primitiveType, geoOffset, count);
    
}