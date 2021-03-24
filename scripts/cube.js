function getCubePositions(outer, inner) {
        return new Float32Array([
        // Front Rigid Face
        // Face
        0,   0,  0,
        0, outer,  0,
        (outer-inner)/2,   0,  0,
        0, outer,  0,
        (outer-inner)/2, outer,  0,
        (outer-inner)/2,   0,  0,

        (outer-inner)/2,   0,  0,
        (outer-inner)/2,  (outer-inner)/2,  0,
        (outer+inner)/2,   0,  0,
        (outer-inner)/2,  (outer-inner)/2,  0,
        (outer+inner)/2,  (outer-inner)/2,  0,
        (outer+inner)/2,   0,  0,

        (outer+inner)/2,0,0,
        (outer+inner)/2,outer,0,
        outer,0,0,
        (outer+inner)/2,outer,0,
        outer,outer,0,
        outer,0,0,

        (outer-inner)/2,   (outer+inner)/2,  0,
        (outer-inner)/2,  outer,  0,
        (outer+inner)/2,   (outer+inner)/2,  0,
        (outer-inner)/2,  outer,  0,
        (outer+inner)/2,  outer,  0,
        (outer+inner)/2,   (outer+inner)/2,  0,

        // Back
        (outer+inner)/2, 0, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer-inner)/2, 0, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer-inner)/2, 0, (outer-inner)/2,

        outer, (outer-inner)/2, (outer-inner)/2,
        outer, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer-inner)/2,
        outer, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer-inner)/2,

        (outer+inner)/2, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, outer, (outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, outer, (outer-inner)/2,
        (outer-inner)/2, outer, (outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,

        (outer-inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,
        0, (outer-inner)/2, (outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,
        0, (outer+inner)/2, (outer-inner)/2,
        0, (outer-inner)/2, (outer-inner)/2,


        // Top Outer
        0, 0, (outer-inner)/2,
        0,0,0,
        outer,0,(outer-inner)/2,
        0,0,0,
        outer,0,0,
        outer,0,(outer-inner)/2,

        // Top Inner (Bottom blocks)
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,
        (outer-inner)/2,(outer+inner)/2,0,
        (outer+inner)/2,(outer+inner)/2,(outer-inner)/2,
        (outer-inner)/2,(outer+inner)/2,0,
        (outer+inner)/2,(outer+inner)/2,0,
        (outer+inner)/2,(outer+inner)/2,(outer-inner)/2,


        // Bottom Outer
        0,outer,0,
        0,outer,(outer-inner)/2,
        outer,outer,0,
        0,outer,(outer-inner)/2,
        outer,outer,(outer-inner)/2,
        outer,outer,0,

        // Bottom Inner (Top Block)
        (outer-inner)/2,(outer-inner)/2,0,
        (outer-inner)/2,(outer-inner)/2,(outer-inner)/2,
        (outer+inner)/2,(outer-inner)/2,0,
        (outer-inner)/2,(outer-inner)/2,(outer-inner)/2,
        (outer+inner)/2,(outer-inner)/2,(outer-inner)/2,
        (outer+inner)/2,(outer-inner)/2,0,

          //Normal (1, 0, 0)
        outer, 0, 0,
        outer, outer,0,
        outer, 0,(outer-inner)/2,
        outer, outer,0,
        outer, outer,(outer-inner)/2,
        outer, 0,(outer-inner)/2,

        (outer-inner)/2, (outer-inner)/2, 0,
        (outer-inner)/2, (outer+inner)/2,0,
        (outer-inner)/2, (outer-inner)/2,(outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2,0,
        (outer-inner)/2, (outer+inner)/2,(outer-inner)/2,
        (outer-inner)/2, (outer-inner)/2,(outer-inner)/2,

        // Normal (-1,0,0)
        0,0,(outer-inner)/2,
        0,outer,(outer-inner)/2,
        0,0,0,
        0,outer,(outer-inner)/2,
        0,outer,0,
        0,0,0,

        (outer+inner)/2,(outer-inner)/2,(outer-inner)/2,
        (outer+inner)/2,(outer+inner)/2,(outer-inner)/2,
        (outer+inner)/2,(outer-inner)/2,0,
        (outer+inner)/2,(outer+inner)/2,(outer-inner)/2,
        (outer+inner)/2,(outer+inner)/2,0,
        (outer+inner)/2,(outer-inner)/2,0,


        ///////// Back Rigid Face /////////
        // Front
        outer, 0, outer,
        outer, outer, outer,
        (outer+inner)/2, 0, outer,
        outer, outer, outer,
        (outer+inner)/2, outer, outer,
        (outer+inner)/2, 0, outer,

        (outer+inner)/2, 0, outer,
        (outer+inner)/2, (outer-inner)/2, outer,
        (outer-inner)/2, 0, outer,
        (outer+inner)/2, (outer-inner)/2, outer,
        (outer-inner)/2, (outer-inner)/2, outer,
        (outer-inner)/2, 0, outer,

        (outer+inner)/2, (outer+inner)/2, outer,
        (outer+inner)/2, outer, outer,
        (outer-inner)/2, (outer+inner)/2, outer,
        (outer+inner)/2, outer, outer,
        (outer-inner)/2, outer, outer,
        (outer-inner)/2, (outer+inner)/2, outer,

        (outer-inner)/2, 0, outer,
        (outer-inner)/2, outer, outer,
        0, 0, outer,
        (outer-inner)/2, outer, outer,
        0, outer, outer,
        0, 0, outer,


        // Back
        0, (outer-inner)/2, (outer+inner)/2,
        0, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,
        0, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,

        (outer-inner)/2, 0, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, 0, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, 0, (outer+inner)/2,

        (outer+inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,
        outer, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,
        outer, (outer+inner)/2, (outer+inner)/2,
        outer, (outer-inner)/2, (outer+inner)/2,

        (outer-inner)/2, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, outer, (outer+inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, outer, (outer+inner)/2,
        (outer+inner)/2, outer, (outer+inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,


        // Top Outer
        0, 0, outer,
        0,0,(outer+inner)/2,
        outer,0,outer,
        0,0,(outer+inner)/2,
        outer,0,(outer+inner)/2,
        outer,0,outer,

        // Top Inner (Bottom Block)
        (outer-inner)/2, (outer+inner)/2, outer,
        (outer-inner)/2,(outer+inner)/2,(outer+inner)/2,
        (outer+inner)/2,(outer+inner)/2,outer,
        (outer-inner)/2,(outer+inner)/2,(outer+inner)/2,
        (outer+inner)/2,(outer+inner)/2,(outer+inner)/2,
        (outer+inner)/2,(outer+inner)/2,outer,

        // Bottom Outer
        0,outer,(outer+inner)/2,
        0,outer,outer,
        outer,outer,(outer+inner)/2,
        0,outer,outer,
        outer,outer,outer,
        outer,outer,(outer+inner)/2,

        // Bottom Inner
        (outer-inner)/2,(outer-inner)/2,(outer+inner)/2,
        (outer-inner)/2,(outer-inner)/2,outer,
        (outer+inner)/2,(outer-inner)/2,(outer+inner)/2,
        (outer-inner)/2,(outer-inner)/2,outer,
        (outer+inner)/2,(outer-inner)/2,outer,
        (outer+inner)/2,(outer-inner)/2,(outer+inner)/2,

        // Right Outer
        outer, 0, (outer+inner)/2,
        outer, outer,(outer+inner)/2,
        outer, 0,outer,
        outer, outer,(outer+inner)/2,
        outer, outer,outer,
        outer, 0,outer,

        // Right Inner (Left Block)
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, outer,
        (outer-inner)/2, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer+inner)/2, outer,
        (outer-inner)/2, (outer-inner)/2, outer,

        // Left Outer
        0,0,outer,
        0,outer,outer,
        0,0,(outer+inner)/2,
        0,outer,outer,
        0,outer,(outer+inner)/2,
        0,0,(outer+inner)/2,

        // Left Inner (Right Block)
        (outer+inner)/2,(outer-inner)/2,outer,
        (outer+inner)/2,(outer+inner)/2,outer,
        (outer+inner)/2,(outer-inner)/2,(outer+inner)/2,
        (outer+inner)/2,(outer+inner)/2,outer,
        (outer+inner)/2,(outer+inner)/2,(outer+inner)/2,
        (outer+inner)/2,(outer-inner)/2,(outer+inner)/2,

        ////////// Right Top Block //////////
        outer,0,(outer-inner)/2,
        outer,(outer-inner)/2,(outer-inner)/2,
        outer,0,(outer+inner)/2,
        outer,(outer-inner)/2,(outer-inner)/2,
        outer,(outer-inner)/2,(outer+inner)/2,
        outer,0,(outer+inner)/2,

        (outer+inner)/2, 0, (outer+inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, 0, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer+inner)/2, 0, (outer-inner)/2,

        (outer+inner)/2, 0, (outer-inner)/2,
        outer, 0, (outer-inner)/2,
        (outer+inner)/2, 0, (outer+inner)/2,
        outer, 0, (outer-inner)/2,
        outer, 0, (outer+inner)/2,
        (outer+inner)/2, 0, (outer+inner)/2,

        (outer+inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer+inner)/2,
        outer, (outer-inner)/2, (outer-inner)/2,
        (outer+inner)/2, (outer-inner)/2, (outer+inner)/2,
        outer, (outer-inner)/2, (outer+inner)/2,
        outer, (outer-inner)/2, (outer-inner)/2,

        ////////// Right Bottom Block /////////
        outer,(outer+inner)/2,(outer-inner)/2,
        outer,outer,(outer-inner)/2,
        outer,(outer+inner)/2,(outer+inner)/2,
        outer,outer,(outer-inner)/2,
        outer,outer,(outer+inner)/2,
        outer,(outer+inner)/2,(outer+inner)/2,

        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,
        (outer+inner)/2, outer, (outer+inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, outer, (outer+inner)/2,
        (outer+inner)/2, outer, (outer-inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer-inner)/2,

        (outer+inner)/2, (outer+inner)/2, (outer-inner)/2,
        outer, (outer+inner)/2, (outer-inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,
        outer, (outer+inner)/2, (outer-inner)/2,
        outer, (outer+inner)/2, (outer+inner)/2,
        (outer+inner)/2, (outer+inner)/2, (outer+inner)/2,

        (outer+inner)/2, outer, (outer-inner)/2,
        (outer+inner)/2, outer, (outer+inner)/2,
        outer, outer, (outer-inner)/2,
        (outer+inner)/2, outer, (outer+inner)/2,
        outer, outer, (outer+inner)/2,
        outer, outer, (outer-inner)/2,

        ////////// Left Top Block //////////
        0, 0, (outer+inner)/2,
        0, (outer-inner)/2, (outer+inner)/2,
        0, 0, (outer-inner)/2,
        0, (outer-inner)/2, (outer+inner)/2,
        0, (outer-inner)/2, (outer-inner)/2,
        0, 0, (outer-inner)/2,

        (outer-inner)/2, 0, (outer-inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer-inner)/2,
        (outer-inner)/2, 0, (outer+inner)/2,
        (outer-inner)/2,(outer-inner)/2,(outer-inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer-inner)/2, 0, (outer+inner)/2,

        0, 0, (outer-inner)/2,
        (outer-inner)/2, 0, (outer-inner)/2,
        0, 0, (outer+inner)/2,
        (outer-inner)/2, 0, (outer-inner)/2,
        (outer-inner)/2, 0, (outer+inner)/2,
        0, 0, (outer+inner)/2,

        0, (outer-inner)/2, (outer-inner)/2,
        0, (outer-inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer-inner)/2,
        0, (outer-inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer-inner)/2, (outer-inner)/2,

        ////////// Left Bottom Block /////////
        0, (outer+inner)/2, (outer+inner)/2,
        0, outer, (outer+inner)/2,
        0, (outer+inner)/2, (outer-inner)/2,
        0, outer, (outer+inner)/2,
        0, outer, (outer-inner)/2,
        0, (outer+inner)/2, (outer-inner)/2,

        (outer-inner)/2,(outer+inner)/2,(outer-inner)/2,
        (outer-inner)/2,outer,(outer-inner)/2,
        (outer-inner)/2,(outer+inner)/2,(outer+inner)/2,
        (outer-inner)/2,outer,(outer-inner)/2,
        (outer-inner)/2,outer,(outer+inner)/2,
        (outer-inner)/2,(outer+inner)/2,(outer+inner)/2,

        0, (outer+inner)/2, (outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,
        0, (outer+inner)/2, (outer+inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer-inner)/2,
        (outer-inner)/2, (outer+inner)/2, (outer+inner)/2,
        0, (outer+inner)/2, (outer+inner)/2,

        0, outer, (outer-inner)/2,
        0, outer, (outer+inner)/2,
        (outer-inner)/2, outer, (outer-inner)/2,
        0, outer, (outer+inner)/2,
        (outer-inner)/2, outer, (outer+inner)/2,
        (outer-inner)/2, outer, (outer-inner)/2,

        ]);
}
var cubeNormals = new Float32Array([
        ///////// Front Rigid Face //////////
        // Front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // Back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        // Top Outer
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // Top Inner (Bottom block)
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // Bottom Outer
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // Bottom Inner (Top block)
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // Right Outer
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // Right Inner (Left block)
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // Left Outer
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        // Left Inner (Right block)
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        ///////// Back Rigid Face //////////
        // Front
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        // Back
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // Top Outer
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // Top Inner (Bottom block)
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // Bottom Outer
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // Bottom Inner (Top block)
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // Right Outer
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // Right Inner (Left block)
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // Left Outer
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        // Left Inner (Right block)
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        /////// Right Top Block ///////////
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        /////// Right Bottom Block ///////////
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        /////// Left Top Block ///////////
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        /////// Left Bottom Block ///////////
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        /////////// Right TOP Block /////////////


        ]);