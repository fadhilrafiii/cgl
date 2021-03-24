"use strict";

function main(input, projection, transform, cameraArr, shader) {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    const vsSource = document.getElementById("vertex-shader-3d").text;
    const fsSource = document.getElementById("fragment-shader-3d").text;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_Position");
    var normalLocation = gl.getAttribLocation(program, "a_normal");

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

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    setGeometry(gl, input);

    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    setNormals(gl, input);

    
    var scale = transform[3];
    var translation = [transform[4], transform[5], transform[6]];
    translation = translation.map((item) => -1 * parseInt(item));
    var rotation = [
        degToRad(transform[0]),
        degToRad(transform[1]),
        degToRad(transform[2]),
    ];

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

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
        
        var projectionMatrix;
        
        if (projection.type == 'perspective') {
            let fieldOfViewRadians = degToRad(projection.element[0]);
            let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            let zNear = projection.element[1];
            // let zFar = projection.element[2];
            let zFar = projection.element[2];
            projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        } else if (projection.type == 'orthographic') {
            let left = projection.element[3];
            let right = projection.element[4];
            let bottom = projection.element[5];
            let top = projection.element[6];
            let near = projection.element[7];
            let far = projection.element[8];
            projectionMatrix = m4.orthographic(left, right, bottom, top, near, far);
        } else {
            let left = projection.element[3];
            let right = projection.element[4];
            let bottom = projection.element[5];
            let top = projection.element[6];
            let near = projection.element[7];
            let far = projection.element[8];
            let theta = projection.element[9];
            let phi = projection.element[10];
            let oblique = m4.oblique(theta, phi);
            let ortho = m4.orthographic(left, right, bottom, top, near, far);
            projectionMatrix = m4.multiply(oblique, ortho);
        }

        projectionMatrix = m4.scale(projectionMatrix, scale, scale, 1);

        var camera = [0, 2000 / (cameraArr[3]+2), 3000 / (cameraArr[3]+2)];
        var target = [0, 1, 0];
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(camera, target, up);
        cameraMatrix = m4.translate(
            cameraMatrix,
            translation[0],
            translation[1],
            translation[2]
        );
        cameraMatrix = m4.scale(cameraMatrix, 1, 1, 1);
        var viewMatrix = m4.inverse(cameraMatrix);
        var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
        viewProjectionMatrix = m4.xRotate(
            viewProjectionMatrix,
            degToRad(cameraArr[0]),
            0
        );
        viewProjectionMatrix = m4.yRotate(
            viewProjectionMatrix,
            degToRad(cameraArr[1]),
            0
        );
        viewProjectionMatrix = m4.zRotate(
            viewProjectionMatrix,
            degToRad(cameraArr[2]),
            0
        );

        var worldMatrix = m4.xRotation(rotation[0]);
        worldMatrix = m4.xRotate(worldMatrix, rotation[0], input.outer / 2);
        worldMatrix = m4.yRotate(worldMatrix, rotation[1], input.outer / 2);
        worldMatrix = m4.zRotate(worldMatrix, rotation[2], input.outer / 2);

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
            const { r, g, b } = input.color;
            gl.uniform4fv(colorLocation, [r, g, b, 1]);
        } else {
            gl.uniform4fv(colorLocation, [1, 0, 0, 1]);
        }

        if (shader) {
            gl.uniform3fv(
                reverseLightDirectionLocation,
                m4.normalize([1, 1, 1])
            );
        }

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 200 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}
