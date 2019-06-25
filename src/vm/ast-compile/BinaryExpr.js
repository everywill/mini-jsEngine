const mixin = require('../../utils/decorator-mixin')
const Name = require('../../parser/basic-parser/ast/Name')
const Opcode = require('../Opcode')

const BinaryExprCompile = mixin({
  compile(code) {
    let op = this.operator.name
    if (op === '=') {
      // assigment
      if (this.left instanceof Name) {
        this.right.compile(code)
        this.left.compileAssign(code)
      } else {
        throw new Error('bad assigment!')
      }
    } else {
      this.left.compile(code)
      this.right.compile(code)
      code.addByte(this.getOpcode(op))
      code.add(Opcode.encodeRegister(code.nextReg - 2))
      code.add(Opcode.encodeRegister(code.nextReg - 1))
      code.nextReg--
    }
  },
  getOpcode(op) {
    if (op === '+') {
      return Opcode.ADD
    } else if (op === '-') {
      return Opcode.SUB
    } else if (op === '*') {
      return Opcode.MUL
    } else if (op === '/') {
      return Opcode.DIV
    } else if (op === '%') {
      return Opcode.REM
    } else if (op === '==') {
      return Opcode.EQUAL
    } else if (op === '>') {
      return Opcode.MORE
    } else if (op === '<') {
      return Opcode.LESS
    } else  {
      throw new Error('bad operator!')
    }
  }
})

module.exports = BinaryExprCompile
