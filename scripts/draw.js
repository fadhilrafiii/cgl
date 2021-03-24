
function setGeometry(gl, shape) {
  let positions = [];
  console.log(shape.shape);
  if (shape.shape == "cube") {
    positions = getCubePositions(shape.outer, shape.inner);
  } else if (shape.shape == "tetrahedron") {
    positions = getTetrahedronPositions();
  } else if (shape.shape == "octahedron") {
    positions = getOctahedronPositions();
  }
  console.log(positions)
  
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
    } else if (shape.shape == "octahedron") {
      normals = octahedronNormals;
    }
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  }