const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const StringLiteralCompile = mixin({
  compile(code) {
    let index = code.record(this.value)
    code.addByte(Opcode.SCONST)
    code.addShort(Opcode.encodeShortOffset(index))
    code.addByte(Opcode.encodeRegister(code.nextReg++))
  }
})

module.exports = StringLiteralCompile
