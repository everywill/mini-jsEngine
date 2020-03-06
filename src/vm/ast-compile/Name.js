const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const NameCompile = mixin({
  compile(code) {
    if (this.nestHierarchy > 0) {
      // no closure for simplicity
      code.addByte(Opcode.GMOVE)
      code.addShort(Opcode.encodeShortOffset(this.index))
      code.addByte(Opcode.encodeRegister(code.nextReg++))
    } else {
      code.addByte(Opcode.MOVE)
      code.addByte(Opcode.encodeOffset(this.index))
      code.addByte(Opcode.encodeRegister(code.nextReg++))
    }
  },
  compileAssign(code) {
    if (this.nestHierarchy > 0) {
      // no closure for simplicity
      code.addByte(Opcode.GMOVE)
      code.addByte(Opcode.encodeRegister(code.nextReg - 1))
      code.addShort(Opcode.encodeShortOffset(this.index))
    } else {
      code.addByte(Opcode.MOVE)
      code.addByte(Opcode.encodeRegister(code.nextReg -1))
      code.addByte(Opcode.encodeOffset(this.index))
    }
  }
})

module.exports = NameCompile