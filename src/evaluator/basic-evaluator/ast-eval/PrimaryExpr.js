const mixin = require('../../../utils/decorator-mixin')

const PrimaryExprEval = mixin({
  evalSubExpr(env, nestHierarchy) {
    if (this.hasPostfix(nestHierarchy)) {
      let target = this.evalSubExpr(env, nestHierarchy + 1)
      return this.postfix(nestHierarchy).eval(env, target)
    } else {
      return this.operand.eval(env)
    }
  },
  eval(env) {
    return this.evalSubExpr(env, 0)
  }
})

module.exports = PrimaryExprEval
