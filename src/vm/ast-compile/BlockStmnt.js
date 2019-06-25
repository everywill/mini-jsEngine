const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const BlockStmntCompile = mixin({
  compile(code) {
    if (this.numChildren > 0) {
      let initReg = code.nextReg
      for (let stmnt of this) {
        code.nextReg = initReg
        stmnt.compile(code)
      }
    } else {
      code.addByte(Opcode.NCONST)
      code.add(0)
      code.addByte(Opcode.encodeRegister(code.nextReg++))
    }
  }
})

module.exports = BlockStmntCompile
