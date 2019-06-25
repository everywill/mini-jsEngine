const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')
const StoneVM = require('../StoneVM')

const FuncStmntCompile = mixin({
  compile(code) {
    code.nextReg = 0
    // 函数变量 + 寄存器 保存所需要空间
    code.frameSize = this.size + StoneVM.SAVEAREASIZE
    code.addByte(Opcode.SAVE)
    code.addByte(Opcode.encodeOffset(this.size))
    this.body.compile(code)
    // 准备返回值
    code.addByte(Opcode.MOVE)
    code.addByte(Opcode.encodeRegister(code.nextReg - 1))
    code.addByte(Opcode.encodeOffset(0))
    // 函数返回
    code.addByte(Opcode.RESTORE)
    code.addByte(Opcode.encodeOffset(this.size))
    code.addByte(Opcode.RETURN)
  }
})

module.exports = FuncStmntCompile
