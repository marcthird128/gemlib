// gemlib 0.0.1
// vec3.js
// defines a Vec3 class

// dependencies
const { StaticMap } = require('./map.js');
// vec3
class Vec3 extends StaticMap {
    constructor(a, b, c) {
        if (a === undefined) {
            // default
            super([0, 0, 0]);
        } else if (a instanceof Vec3) {
            // if its a Vec3
            super(a.get());
        } else if (Array.isArray(a)) {
            // if its an array
            let x = parseFloat(a[0]) || 0;
            let y = parseFloat(a[1]) || 0;
            let z = parseFloat(a[2]) || 0;

            super([x, y, z]);
        } else {
            super([parseFloat(a) || 0, parseFloat(b) || 0, parseFloat(c) || 0]);
        }
    }

    // xyz setter/getters
    get x() {
        return this.input[0];
    }
    get y() {
        return this.input[1];
    }
    get z() {
        return this.input[2];
    }
    set x(val) {
        this.input[0] = parseFloat(val) || 0;
        this.markDirty();
    }
    set y(val) {
        this.input[1] = parseFloat(val) || 0;
        this.markDirty();
    }
    set z(val) {
        this.input[2] = parseFloat(val) || 0;
        this.markDirty();
    }

    // math and misc
    copy() {
        return new Vec3(this);
    }
    array() {
        return this.input.slice();
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    normalize() {
        let len = this.length();
        this.input[0] /= len;
        this.input[1] /= len;
        this.input[2] /= len;

        // mark dirty
        this.markDirty();
    }
    clamp(min, max) {
        this.input[0] = Math.min(Math.max(this.input[0], min), max);
        this.input[1] = Math.min(Math.max(this.input[1], min), max);
        this.input[2] = Math.min(Math.max(this.input[2], min), max);

        // mark dirty
        this.markDirty();
    }
    add(v) {
        if (v instanceof Vec3) {
            this.input[0] += v.x;
            this.input[1] += v.y;
            this.input[2] += v.z;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] += v;
            this.input[1] += v;
            this.input[2] += v;
        }

        // mark dirty
        this.markDirty();
    }
    sub(v) {
        if (v instanceof Vec3) {
            this.input[0] -= v.x;
            this.input[1] -= v.y;
            this.input[2] -= v.z;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] -= v;
            this.input[1] -= v;
            this.input[2] -= v;
        }

        // mark dirty
        this.markDirty();
    }
    mul(v) {
        if (v instanceof Vec3) {
            this.input[0] *= v.x;
            this.input[1] *= v.y;
            this.input[2] *= v.z;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] *= v;
            this.input[1] *= v;
            this.input[2] *= v;
        }

        // mark dirty
        this.markDirty();
    }
    div(v) {
        if (v instanceof Vec3) {
            this.input[0] /= v.x;
            this.input[1] /= v.y;
            this.input[2] /= v.z;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] /= v;
            this.input[1] /= v;
            this.input[2] /= v;
        }

        // mark dirty
        this.markDirty();
    }
    dot(v) {
        if (v instanceof Vec3) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        } else {
            v = parseFloat(v) || 0;
            return this.x * v + this.y * v + this.z * v;
        }
    }
    cross(v) {
        if (v instanceof Vec3) {
            let x = this.y * v.z - this.z * v.y;
            let y = this.z * v.x - this.x * v.z;
            let z = this.x * v.y - this.y * v.x;
            this.input[0] = x;
            this.input[1] = y;
            this.input[2] = z;
        } else {
            v = parseFloat(v) || 0;
            let x = this.y * v - this.z * v;
            let y = this.z * v - this.x * v;
            let z = this.x * v - this.y * v;
            this.input[0] = x;
            this.input[1] = y;
            this.input[2] = z;
        }

        // mark dirty
        this.markDirty();
    }
    map(fn) {
        // if its not a function return
        if (typeof fn !== 'function') {
            console.warn('Vec3.map() called with non-function argument');
            return;
        }

        // map
        this.input[0] = fn(this.x);
        this.input[1] = fn(this.y);
        this.input[2] = fn(this.z);

        // mark dirty
        this.markDirty();
    }
    set(x, y, z) {
        this.input[0] = parseFloat(x) || 0;
        this.input[1] = parseFloat(y) || 0;
        this.input[2] = parseFloat(z) || 0;

        // mark dirty
        this.markDirty();
    }
    get() {
        return this.input.slice();
    }
    equals(v, epsilon = 0.00001) {
        if (v instanceof Vec3) {
            return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon && Math.abs(this.z - v.z) < epsilon;
        } else {
            v = parseFloat(v) || 0;
            return Math.abs(this.x - v) < epsilon && Math.abs(this.y - v) < epsilon && Math.abs(this.z - v) < epsilon;
        }
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
    toJSON() {
        return this.input;
    }
}

// export
module.exports = {
    Vec3
}