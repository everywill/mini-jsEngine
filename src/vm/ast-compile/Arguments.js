const mixin = require('../../utils/decorator-mixin')
const Opcode = require('../Opcode')

const ArgumentsCompile = mixin({
  compile(code) {
    code.addByte(Opcode.CALL)
  }
})

module.exports = ArgumentsCompile