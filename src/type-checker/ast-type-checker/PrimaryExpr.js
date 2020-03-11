const mixin = require('../../utils/decorator-mixin')

const PrimaryExprTypeChecker = mixin({
  typeCheck(typeEnv) {
    return this.typeCheckSubExpr(typeEnv, 0)
  },
  typeCheckSubExpr(typeEnv, nestHierarchy) {
    if (this.hasPostfix(nestHierarchy)) {
      const targetType = this.typeCheckSubExpr(typeEnv, nestHierarchy + 1)
      return this.postfix(nestHierarchy).typeCheck(typeEnv, targetType)
    } else {
      return this.operand.typeCheck(typeEnv)
    }
  }
})

module.exports = PrimaryExprTypeChecker
