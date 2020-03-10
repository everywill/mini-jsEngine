const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const NegativeExprTypeChecker = mixin({
  typeCheck(typeEnv) {
    const type = this.operand.typeCheck(typeEnv)
    type.assertSubtypeOf(TypeInfo.INT, typeEnv, this)
    return TypeInfo.INT
  }
})

module.exports = NegativeExprTypeChecker
