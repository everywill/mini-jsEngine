const StoneVM = require('./StoneVM')

const BIT32_MAXVALUE = Math.pow(2, 32) - 1
const BIT16_MAXVALUE = Math.pow(2, 16) - 1 
const BIT16_MINVALUE = -(Math.pow(2, 16) - 1)

class Opcode {
  // load a 32bit number to register
  static get NCONST() {
    return 1
  }
  // load a string
  static get SCONST() {
    return 3
  }
  // move a value between register and stack
  static get MOVE() {
    return 4
  }
  // move a value between register and heap(global variavle)
  static get GMOVE() {
    return 5
  }
  // branch if else
  static get IFZERO() {
    return 6
  }
  // goto
  static get GOTO() {
    return 7
  }
  // function call
  static get CALL() {
    return 8
  }
  // function return
  static get RETURN() {
    return 9
  }
  static get SAVE() {
    return 10
  }
  static get RESTORE() {
    return 11
  }
  // reverse the sign of register
  static get NEG() {
    return 12
  }
  // add
  static get ADD() {
    return 13
  }
  // substract
  static get SUB() {
    return 14
  }
  // multiply
  static get MUL() {
    return 15
  }
  // divide
  static get DIV() {
    return 16
  }
  // remainder
  static get REM() {
    return 17
  }
  // equal
  static get EQUAL() {
    return 18
  }
  // more than
  static get MORE() {
    return 19
  }
  // less than
  static get LESS() {
    return 20
  }
  // encode a register order number
  static encodeRegister(regNo) {
    if (regNo > StoneVM.NUMBEROFREG) {
      throw new Error('exceed register number limit!')
    } else {
      return -(regNo + 1)
    }
  }
  // decode a register order number
  static decodeRegister(operand) {
    return -operand - 1
  }
  // check offset
  static encodeOffset(offset) {
    if (offset > BIT32_MAXVALUE) {
      throw new Error('offset is too big!')
    } else {
      return offset
    }
  }
  static encodeShortOffset(offset) {
    if (offset < BIT16_MINVALUE || offset > BIT16_MAXVALUE) {
      throw new Error('offset is too big!')
    } else {
      return offset
    }
  }
  static decodeOffset(offset) {
    return offset
  }
  static isRegister(operand) {
    return operand < 0
  }
  static isOffset(operand) {
    return operand >= 0
  }
}

module.exports = Opcode
