const ASTList = require('../../ast-root/ASTList')
const PrimaryExprEval = require('../../../evaluator/function-evaluator/ast-eval/PrimaryExpr')

@PrimaryExprEval
class PrimaryExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get operand() {
    return this.child(0)
  }
  postfix(nestHierarchy) {
    return this.child(this.numChildren - nestHierarchy - 1)
  }
  hasPostfix(nestHierarchy) {
    return this.numChildren - nestHierarchy - 1 > 0
  }
}

module.exports = PrimaryExpr
