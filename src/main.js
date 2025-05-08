// gemlib 0.0.1
// main.js
// main entry point

// export all modules
module.exports = {
    ...require('./map.js'),
    ...require('./vec2.js'),
    ...require('./vec3.js'),    
}