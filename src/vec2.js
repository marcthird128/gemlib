// gem 0.0.1
// vec2.js
// defines a StaticMap Vec2 that represents
// a vec2 (what else would it represent?)

// get dependencies
const { StaticMap } = require('./map.js');

// Vec2 class
class Vec2 extends StaticMap {
    constructor(a, b) {
        if (a === undefined) {
            // default
            super([0, 0]);
        } else if(a instanceof Vec2) {
            // if a Vec2 was passed, copy
            super(a.get());
        } else if (Array.isArray(a)) {
            // if an array was passed, parse it
            let x = parseFloat(a[0]) || 0;
            let y = parseFloat(a[1]) || 0;
            
            super([x, y]);
        } else {
            // try to parse as numbers
            let x = parseFloat(a) || 0;
            let y = parseFloat(b) || 0;

            super([x, y]);
        }
    }

    // static methods
    static fromAngle(angle) {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }

    // xy setters & getters
    get x() {
        return this.input[0];
    }
    get y() {
        return this.input[1];
    }
    set x(val) {
        this.input[0] = parseFloat(val) || 0;
        this.markDirty();
    }
    set y(val) {
        this.input[1] = parseFloat(val) || 0;
        this.markDirty();
    }

    // math and misc
    copy() {
        return new Vec2(this);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let len = this.length();
        this.input[0] /= len;
        this.input[1] /= len;

        // mark dirty
        this.markDirty();
    }
    clamp(min, max) {
        this.input[0] = Math.min(Math.max(this.x, min), max);
        this.input[1] = Math.min(Math.max(this.y, min), max);

        // mark dirty
        this.markDirty();
    }
    add(v) {
        if (v instanceof Vec2) {
            this.input[0] += v.x;
            this.input[1] += v.y;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] += v;
            this.input[1] += v;
        }

        // mark dirty
        this.markDirty();
    }
    sub(v) {
        if (v instanceof Vec2) {
            this.input[0] -= v.x;
            this.input[1] -= v.y;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] -= v;
            this.input[1] -= v;
        }

        // mark dirty
        this.markDirty();
    }
    mul(v) {
        if (v instanceof Vec2) {
            this.input[0] *= v.x;
            this.input[1] *= v.y;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] *= v;
            this.input[1] *= v;
        }

        // mark dirty
        this.markDirty();
    }
    div(v) {
        if (v instanceof Vec2) {
            this.input[0] /= v.x;
            this.input[1] /= v.y;
        } else {
            v = parseFloat(v) || 0;
            this.input[0] /= v;
            this.input[1] /= v;
        }

        // mark dirty
        this.markDirty();
    }
    dot(v) {
        if (v instanceof Vec2) {
            return this.x * v.x + this.y * v.y;
        } else {
            v = parseFloat(v) || 0;
            return this.x * v + this.y * v;
        }
    }
    angle() {
        return Math.atan2(this.x, this.y);
    }
    map(fn) {
        // if its not a function return
        if (typeof fn !== 'function') {
            console.warn('Vec2.map() called with non-function argument');
            return;
        }

        // map
        this.input[0] = fn(this.x);
        this.input[1] = fn(this.y);

        // mark dirty
        this.markDirty();
    }
    set(x, y) {
        this.input[0] = parseFloat(x) || 0;
        this.input[1] = parseFloat(y) || 0;

        // mark dirty
        this.markDirty();
    }
    get() {
        return this.input.slice();
    }
    equals(v, epsilon = 0.00001) {
        if (v instanceof Vec2) {
            return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon;
        } else {
            v = parseFloat(v) || 0;
            return Math.abs(this.x - v) < epsilon && Math.abs(this.y - v) < epsilon;
        }
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
    toJSON() {
        return this.input;
    }
}

// export
module.exports = {
    Vec2
}