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
    var left = -600;
    var right = 500;
    var bottom = -400;
    var top = 500;
    var near = 1;
    var far = 600;
    var matrix = m4.orthographic(left, right, bottom, top, near, far);
    return matrix;
}

function obliqueProjection() {
    var oblique = m4.oblique(100, 60);
    var ortho = m4.orthographic(-600, 500, -400, 500, 1, 600);
    var matrix = m4.multiply(oblique, ortho);
    return matrix;
}