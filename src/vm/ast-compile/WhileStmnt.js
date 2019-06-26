const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const WhileStmntCompile = mixin({
  compile(code) {
    code.addByte(Opcode.NCONST)
    code.add(0)
    code.addByte(Opcode.encodeRegister(code.nextReg++))
  }
})

module.exports = WhileStmntCompile
