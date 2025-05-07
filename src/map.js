// gemlib 0.0.1
// map.js
// defines base Map classes.
// in gemlib, "maps" are special objects
// which calculate an output based on
// an input. Observer pattern and lazy
// evaluation is used.

// basic map
class BaseMap {
    constructor(input) {
        this.dirty = false; // is re-calculation needed?
        this.observers = new Set();
        this._output = null;
        this.input = input || null;
    }
    
    // observer utils
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.delete(observer);
    }

    // dirty
    markDirty() {
        this.dirty = true;
        this.observers.forEach(o => {
            if (o) {
                o.markDirty();
            } else {
                // remove it if it doesn't exist
                this.removeObserver(o);
            } 
        })
    }

    // calculate value
    // sub classes should
    // override this
    calculate() {
        console.warn("Calculated a base Map object");
    }

    // input setter/getters
    get input() {
        return this._input;
    }
    set input(input) {
        // optimization: do nothing if its the same
        if (this.input === input) {
            return;
        }

        // remove from old observer
        if (this.input instanceof BaseMap) {
            this.input.removeObserver(this);
        }

        // set internal
        this._input = input;

        // add to new observer
        if (this.input instanceof BaseMap) {
            this.input.addObserver(this);
        }

        // mark dirty
        this.markDirty();
    }

    // output setter/getter
    set output(_) {
        console.warn("Attempt to set output of Map");
    }
    get output() {
        if (this.dirty) {
            this.calculate();
            this.dirty = false;
        }
        return this._output;
    }
}

// static map (output is input)
class StaticMap extends BaseMap {
    calculate() {
        this._output = this.input;
    }

    // override get output to never call
    // claculate and 
    // just return this.input
    get output() {
        return this.input;
    }
}

// export
module.exports = {
    BaseMap, StaticMap
};