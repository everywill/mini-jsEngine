const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const WhileStmntCompile = mixin({
  compile(code) {
    let initReg = code.nextReg
    // 不经过while的返回值
    code.addByte(Opcode.NCONST)
    code.add(0)
    code.addByte(Opcode.encodeRegister(code.nextReg++))

    let pos = code.position
    this.condition.compile(code)

    let pos2 = code.position
    // 条件判断
    code.addByte(Opcode.IFZERO)
    code.addByte(Opcode.encodeRegister(--code.nextReg))
    // 循环结束跳转位置占位
    code.addShort(Opcode.encodeShortOffset(0))

    code.nextReg = initReg
    this.body.compile(code)
    let pos3 = code.position

    code.addByte(Opcode.GOTO)
    code.addShort(Opcode.encodeShortOffset(pos - pos3))

    code.set(Opcode.encodeShortOffset(code.position - pos2), pos2 + 2)
  }
})

module.exports = WhileStmntCompile
