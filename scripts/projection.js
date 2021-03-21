var gl = canvas.getContext("webgl");
function perspectiveProjection() {
    var fieldOfViewRadians = degToRad(70);
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var zNear = 1;
    var zFar = 2000;
    var matrix = m4.perspective(
        fieldOfViewRadians,
        aspect,
        zNear,
        zFar
    );
    return matrix;
}

function orthographicProjection() {
    var left = -2;
    var right = 2;
    var bottom = -2;
    var top = 2;
    var near = 0.1;
    var far = 100;
    var matrix = m4.orthographic(left, right, bottom, top, near, far);
    return matrix;
}

function obliqueProjection() {
    var oblique = m4.oblique(15, 60);
    var ortho = m4.orthographic(-2.0, 2.0, -2.0, 2.0, 0.1, 100);
    var matrix = m4.multiply(oblique, ortho);
    return matrix;
}