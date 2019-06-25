const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const IfStmntCompile = mixin({
  compile(code) {
    this.condition.compile(code)
    code.add(Opcode.IFZERO)
    code.add(Opcode.encodeRegister(--code.nextReg))
  }
})

module.exports = IfStmntCompile
