let rot = 0;

function main() {
    const canvas = document.querySelector("#glCanvas");
    // Initializing
    if (!canvas) {
        alert("No canvas detected!");
        return;
    }

    const gl = canvas.getContext("webgl");

    if (gl == null) {
        alert("Unable to initialize WebGL");
        return;
    }

    console.log(gl, "from main");

    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
        }
    `;

    const fsSource = `
        varying lowp vec4 vColor;

        void main(void) {
            gl_FragColor = vColor;
        }
    `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(
                shaderProgram,
                "aVertexPosition"
            ),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(
                shaderProgram,
                "uProjectionMatrix"
            ),
            modelViewMatrix: gl.getUniformLocation(
                shaderProgram,
                "uModelViewMatrix"
            ),
        },
    };

    const buffers = initBuffers(gl);

    var then = 0;

    // Draw the scene repeatedly
    drawScene(gl, programInfo, buffers);
    // Draw the scene
    // drawScene(gl, programInfo, buffers);
}

window.onload = main;
