function perspectiveProjection(gl) {
    let fieldOfViewRadians = degToRad(70);
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNear = 1;
    let zFar = 2000;
    let matrix = m4.perspective(
        fieldOfViewRadians,
        aspect,
        zNear,
        zFar
    );
    return matrix;
}

function orthographicProjection() {
    let left = -600;
    let right = 500;
    let bottom = -400;
    let top = 500;
    let near = 1;
    let far = 600;
    let matrix = m4.orthographic(left, right, bottom, top, near, far);
    return matrix;
}

function obliqueProjection() {
    let oblique = m4.oblique(100, 60);
    let ortho = m4.orthographic(-600, 500, -400, 500, 1, 600);
    let matrix = m4.multiply(oblique, ortho);
    return matrix;
}