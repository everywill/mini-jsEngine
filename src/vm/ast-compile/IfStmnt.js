const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const IfStmntCompile = mixin({
  compile(code) {
    this.condition.compile(code)
    let pos = code.position
    // else的跳转
    code.addByte(Opcode.IFZERO)
    code.addByte(Opcode.encodeRegister(--code.nextReg))
    code.addShort(Opcode.encodeShortOffset(0)) // 占位
    let initReg = code.nextReg
    this.thenBlock.compile(code)
    let pos2 = code.position
    code.addByte(Opcode.GOTO)
    code.addShort(Opcode.encodeShortOffset(0)) // 占位
    // else的跳转
    code.set(Opcode.encodeShortOffset(code.position - pos), pos + 2)
    let elseBlock = this.elseBlock
    code.nextReg = initReg
    if (elseBlock) {
      elseBlock.compile(code)
    } else {
      code.addByte(Opcode.NCONST)
      code.add(0)
      code.addByte(Opcode.encodeRegister(code.nextReg++))
    }
    code.set(Opcode.encodeShortOffset(code.position - pos2), pos2 + 1)
  }
})

module.exports = IfStmntCompile
