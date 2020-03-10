const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')
const { Name } = require('../../parser/typed-parser/ast')

const BinaryExprTypeChecker = mixin({
  typeCheck(typeEnv) {
    const op = this.operator.name
    if (op === '=') {
      return this.typeCheckForAssign(typeEnv)
    } else {
      const leftType = this.left.typeCheck(typeEnv)
      const rightType = this.left.typeCheck(typeEnv)
      if (op === '+') {
        return leftType.plus(rightType, typeEnv)
      } else if (op === '==') {
        return TypeInfo.INT
      } else {
        leftType.assertSubtypeOf(TypeInfo.INT, typeEnv, this)
        rightType.assertSubtypeOf(TypeInfo.INT, typeEnv, this)
        return TypeInfo.INT
      }
    }
  },
  typeCheckForAssign(typeEnv) {
    const rightType = this.right.typeCheck(typeEnv)
    const left = this.left
    if (left instanceof Name) {
      return left.typeCheckForAssign(typeEnv, rightType)
    } else {
      throw new Error(`bad assignment ${this}`)
    }
  }
})

module.exports = BinaryExprTypeChecker
