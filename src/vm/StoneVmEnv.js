const { ArraySymbolEnv } = require('../evaluator/environment')
const StoneVM = require('./StoneVM')
const Code = require('./Code')

// StoneVM Heap
class StoneVmEnv extends ArraySymbolEnv {
    constructor(codeSize, stackSize, stringSize) {
        super()
        this.stoneVM = new StoneVM(codeSize, stackSize, stringSize, this)
        this.code = new Code(this.stoneVM)
    }
    read(index) {
        return this.values[index]
    }
    write(index, value) {
        this.values[index] = value
    }
}

module.exports = StoneVmEnv