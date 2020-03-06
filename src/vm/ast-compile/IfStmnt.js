const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const IfStmntCompile = mixin({
  compile(code) {
    this.condition.compile(code)

    const pos = code.position
    code.addByte(Opcode.IFZERO)
    code.addByte(Opcode.encodeRegister(--code.nextReg))
    code.addShort(Opcode.encodeShortOffset(0)) // else的跳转占位
    const initReg = code.nextReg
    this.thenBlock.compile(code)

    const pos2 = code.position
    code.addByte(Opcode.GOTO)
    code.addShort(Opcode.encodeShortOffset(0)) // then结束跳转占位
    // 设置正确else的跳转位置
    code.set(Opcode.encodeShortOffset(code.position - pos), pos + 2)
    const elseBlock = this.elseBlock
    code.nextReg = initReg
    if (elseBlock) {
      elseBlock.compile(code)
    } else {
      code.addByte(Opcode.NCONST)
      code.add(0)
      code.addByte(Opcode.encodeRegister(code.nextReg++))
    }
    // 设置正确then结束跳转
    code.set(Opcode.encodeShortOffset(code.position - pos2), pos2 + 1)
  }
})

module.exports = IfStmntCompile
