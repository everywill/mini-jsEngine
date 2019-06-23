const { ArraySymbolEnv } = require('../evaluator/environment')

class StoneVmEnv extends ArraySymbolEnv {
    constructor() {}
    read(index) {
        return this.values[index]
    }
    write(index, value) {
        this.values[index] = value
    }
}

module.exports = StoneVmEnv