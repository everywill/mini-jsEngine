const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const ArgumentsCompile = mixin({
  compile(code) {
    let newOffset = code.frameSize;
    let numOfArgs = 0;
    for (let child of this) {
      child.compile(code)
      code.addByte(Opcode.MOVE)
      code.addByte(Opcode.encodeRegister(--code.nextReg))
      code.addByte(Opcode.encodeOffset(newOffset++))
      numOfArgs++
    }
    code.addByte(Opcode.CALL)
    
  }
})

module.exports = ArgumentsCompile
