
function setGeometry(gl, shape) {
  let positions = [];
  console.log(shape.shape);
  if (shape.shape == "cube") {
    positions = getCubePositions(shape.outer, shape.inner);
  } else if (shape.shape == "tetrahedron") {
    positions = getTetrahedronPositions();
    console.log("asu")
  }
  console.log(positions)
  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = m4.xRotation(Math.PI);
  matrix = m4.translate(matrix, -50, -75, -15);

  for (let ii = 0; ii < positions.length; ii += 3) {
    let vector = m4.transformPoint(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1]);
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}
  
  function setNormals(gl, shape) {
    let normals = cubeNormals;
    if (shape.shape == "cube") {
      normals = cubeNormals;
    } else if (shape.shape == "tetrahedron") {
      normals = tetrahedronNormals;
    }
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  }