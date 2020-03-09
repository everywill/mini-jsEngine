const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const ArgumentsCompile = mixin({
  compile(code) {
    // stack-frame size of caller
    let newOffset = code.frameSize;
    let numOfArgs = 0;
    for (let child of this) {
      child.compile(code)
      code.addByte(Opcode.MOVE)
      code.addByte(Opcode.encodeRegister(--code.nextReg))
      code.addByte(Opcode.encodeOffset(newOffset++))
      numOfArgs++
    }
    // call function
    code.addByte(Opcode.CALL)
    code.addByte(Opcode.encodeRegister(--code.nextReg))
    // 借用encodeOffset
    code.addByte(Opcode.encodeOffset(numOfArgs))

    // return result
    code.addByte(Opcode.MOVE)
    code.addByte(Opcode.encodeOffset(code.frameSize))
    code.addByte(Opcode.encodeRegister(code.nextReg++))
  }
})

module.exports = ArgumentsCompile
