const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const NegativeExprCompile = mixin({
  compile(code) {
    this.operand.compile(code)
    code.addByte(Opcode.NEG)
    code.addByte(Opcode.encodeRegister(code.nextReg - 1))
  }
})

module.exports = NegativeExprCompile
