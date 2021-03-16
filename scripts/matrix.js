function normalize(v, dst) {
    const size = 3;
    let sum = 0;
    for (let i = 0; i < size; i++) {
        sum += v[i]*v[i];
    }
    dst = dst || new Float32Array(size);
    var length = Math.sqrt(sum);
    // make sure we don't divide by 0.
    if (length > 0.00001) {
        for (let p = 0; p < size; p++) {
            dst[p] = v[p] / length;
        }
    }
    return dst;
}

function subtractVectors(a, b, dst) {
    const size = 3;
    dst = dst || new Float32Array(size);
    for (let i = 0; i < size; i++) {
        dst[i] = a[i] - b[i];
    }
    return dst;
}

function cross(a, b, dst) {
    const size = 3;
    dst = dst || new Float32Array(size);
    for (let i = 0; i < size; i++) {
        let c1 = (i+1)%size;
        let c2 = (i+2)%size;
        dst[i] = a[c1] * b[c2] - a[c2] * b[c1];
    }
    return dst;
}

var m4 = {
    transpose: function transpose(m, dst) {
        const size = 4;
        const len = size * size;
        dst = dst || new Float32Array(len);
        for (let i = 0; i < len; i+=size) {
            // i = 0 4 8 12
            let j = Math.floor(i/size);
            for (let k = 0; k < size; k++) {
                // k = 0, 1, 2, 3
                dst [i+k] = m[j+k*size];
            }
        }
        return dst;
    },
    inverse: function inverse(m, dst) {
        const size = 4;
        const len = size * size;
        dst = new Float32Array(len);
        for (let i = 0; i < len; i += size+1) {
            dst[i] = 1;
            m[i] = 1;
        }
        // elementary row operation
        for (let i = 0; i < len; i += size) {
            // i = 0, 4, 8, 12
            // get the element e on the diagonal
            let col = Math.floor(i/size);
            let e = m[i+col];
            // if we have a 0 on the diagonal (we'll need to swap with a lower row)
            if (e==0){
                // look through every row below the i'th row
                for(let j = i+size; j < len; j += size){
                    // if the j'th row has a non-0 in the i'th col
                    if (m[j+col] != 0){
                        //  swap it
                        for(let k = 0; k < len; k++){
                            let col2 = Math.floor(j/size);
                            e = m[i+col2];
                            m[i+col2] = m[j+col];
                            m[j+col] = e;      
                            e = dst[i+col2];       
                            dst[i+col2] = dst[j+col];
                            dst[j+col] = e;      
                        }
                        break;
                    }
                }
                // get the new diagonal
                e = m[i+col];
                // if it's still 0, not invertable (error)
                if (e==0) return;
            }
            // Scale this row down by e
            for(let p = 0; p < len; p += size){
                let col3 = Math.floor(p/size);
                m[i+col3] = m[i+col3]/e;
                dst[i+col3] = dst[i+col3]/e;
            }

            for(let x = 0; x < len; x += size){
                // Only apply to other rows (we want a 1 on the diagonal)
                if (x==i) continue;
                
                e = m[x+col];
                
                for(let y = 0; y < len; y += size){
                    let col4 = Math.floor(y/size);
                    m[x+col4] -= e*m[i+col4];
                    dst[x+col4] -= e*dst[i+col4];
                }
            }
        }
        return dst;
    },
    projection: function (width, height, depth) {
        // Note: This matrix flips the Y axis so 0 is at the top.
        return [
            2 / width,
            0,
            0,
            0,
            0,
            -2 / height,
            0,
            0,
            0,
            0,
            2 / depth,
            0,
            -1,
            1,
            0,
            1,
        ];
    },

    multiply: function (a, b) {
        const size = 4;
        const len = size * size;
        let ret = new Array(len).fill(0);
        // iterate through rows of a
        for (let i = 0; i < len; i += size) {
            // iterate through column of b
            for (let j = 0; j < size; j++) {
                // iterate through rows of b
                for (let k = 0; k < len; k += size) {
                    let colK = Math.floor(k/size);
                    ret[i+j] += b[i+colK] * a[k+j]

                }
            }
        }
        console.log(ret)
        return ret;
    },

    translation: function (tx, ty, tz) {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
    },

    xRotation: function (angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);

        return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
    },

    yRotation: function (angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);

        return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
    },

    zRotation: function (angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);

        return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },

    scaling: function (sx, sy, sz) {
        return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
    },

    translate: function (m, tx, ty, tz) {
        return m4.multiply(m, m4.translation(tx, ty, tz));
    },

    xRotate: function (m, angleInRadians) {
        return m4.multiply(m, m4.xRotation(angleInRadians));
    },

    yRotate: function (m, angleInRadians) {
        return m4.multiply(m, m4.yRotation(angleInRadians));
    },

    zRotate: function (m, angleInRadians) {
        return m4.multiply(m, m4.zRotation(angleInRadians));
    },

    scale: function (m, sx, sy, sz) {
        return m4.multiply(m, m4.scaling(sx, sy, sz));
    },

    transformPoint: function transformPoint(m, v, dst) {
        dst = dst || new Float32Array(3);
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        var d =
            v0 * m[0 * 4 + 3] +
            v1 * m[1 * 4 + 3] +
            v2 * m[2 * 4 + 3] +
            m[3 * 4 + 3];

        dst[0] =
            (v0 * m[0 * 4 + 0] +
                v1 * m[1 * 4 + 0] +
                v2 * m[2 * 4 + 0] +
                m[3 * 4 + 0]) /
            d;
        dst[1] =
            (v0 * m[0 * 4 + 1] +
                v1 * m[1 * 4 + 1] +
                v2 * m[2 * 4 + 1] +
                m[3 * 4 + 1]) /
            d;
        dst[2] =
            (v0 * m[0 * 4 + 2] +
                v1 * m[1 * 4 + 2] +
                v2 * m[2 * 4 + 2] +
                m[3 * 4 + 2]) /
            d;

        return dst;
    },

    normalize: function normalize(v, dst) {
        dst = dst || new Float32Array(3);
        var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        // make sure we don't divide by 0.
        if (length > 0.00001) {
            dst[0] = v[0] / length;
            dst[1] = v[1] / length;
            dst[2] = v[2] / length;
        }
        return dst;
    },

    perspective: function perspective(
        fieldOfViewInRadians,
        aspect,
        near,
        far,
        dst
    ) {
        dst = dst || new Float32Array(16);
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        var rangeInv = 1.0 / (near - far);

        dst[0] = f / aspect;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
        dst[4] = 0;
        dst[5] = f;
        dst[6] = 0;
        dst[7] = 0;
        dst[8] = 0;
        dst[9] = 0;
        dst[10] = (near + far) * rangeInv;
        dst[11] = -1;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = near * far * rangeInv * 2;
        dst[15] = 0;

        return dst;
    },

    lookAt: function lookAt(cameraPosition, target, up, dst) {
        dst = dst || new Float32Array(16);
        var zAxis = normalize(subtractVectors(cameraPosition, target));
        var xAxis = normalize(cross(up, zAxis));
        var yAxis = normalize(cross(zAxis, xAxis));

        dst[0] = xAxis[0];
        dst[1] = xAxis[1];
        dst[2] = xAxis[2];
        dst[3] = 0;
        dst[4] = yAxis[0];
        dst[5] = yAxis[1];
        dst[6] = yAxis[2];
        dst[7] = 0;
        dst[8] = zAxis[0];
        dst[9] = zAxis[1];
        dst[10] = zAxis[2];
        dst[11] = 0;
        dst[12] = cameraPosition[0];
        dst[13] = cameraPosition[1];
        dst[14] = cameraPosition[2];
        dst[15] = 1;

        return dst;
    },
};

function radToDeg(r) {
    return (r * 180) / Math.PI;
}

function degToRad(d) {
    return (d * Math.PI) / 180;
}
