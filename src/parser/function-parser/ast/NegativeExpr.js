const ASTList = require('../../ast-root/ASTList')
const NegativeExprEval = require('../../../evaluator/basic-evaluator/ast-eval/NegativeExpr')

@NegativeExprEval
class NegativeExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get operand() {
    return this.child(1)
  }
  toString() {
    return `-${this.operand}`
  }
}

module.exports = NegativeExpr
