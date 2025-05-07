// gemlib 0.0.1
// vec3.js
// defines a Vec3 class

// dependencies
const { StaticMap } = require('./map.js');

// vec3
class Vec3 {
    constructor(a, b, c) {
        if (a === undefined) {
            super([0, 0, 0]);
        } else if (a instanceof Vec3) {
            super([a.x, a.y, a.z]);
        } else if (Array.isArray(a)) {
            super(a.slice());
        } else {
            super([parseFloat(a) || 0, parseFloat(b) || 0, parseFloat(c) || 0]);
        }
    }
}