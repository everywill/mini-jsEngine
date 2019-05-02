const ASTList = require('../../ast-root/ASTList')
const BinaryExprEval = require('../../../evaluator/basic-evaluator/ast-eval/BinaryExpr')

@BinaryExprEval
class BinaryExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get left() {
    return this.child(0)
  }
  get operator() {
    return this.child(1)
  }
  get right() {
    return this.child(2)
  }
}

module.exports = BinaryExpr
