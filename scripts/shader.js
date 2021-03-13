function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Attach the shader source to shader
    gl.shaderSource(shader, source);

    // Compile shader program;
    gl.compileShader(shader);

    // Catch errors
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shaders unabled to be compiled!");
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function initShaderProgram(gl, vsSource, fsSource) {
    // Initialize webgl shader from opengl shader
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Attach shader to the program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // catch error
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Shader program is not unable to initialized!", gl.getProgramInfoLog(shaderProgram));
        return;
    }

    return shaderProgram;
}

