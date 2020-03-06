const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const NumberLiteralCompile = mixin({
  compile(code) {
    // 数值载入寄存器
    let value = this.value
    code.addByte(Opcode.NCONST)
    code.add(value)
    code.addByte(Opcode.encodeRegister(code.nextReg++))
  }
})

module.exports = NumberLiteralCompile
