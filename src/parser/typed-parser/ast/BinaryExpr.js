const ASTList = require('../../ast-root/ASTList')
let BasicBinaryExprEval = require('../../../evaluator/basic-evaluator/ast-eval/BinaryExpr')
let BinaryExprEvalEnableClass = require('../../../evaluator/class-evaluator/ast-eval/BinaryExpr')
let BinaryExprEvalEnableArray = require('../../../evaluator/array-evaluator/ast-eval/BinaryExpr')
let OptVariableBinaryExprEval = require('../../../evaluator/opt-evaluator/variable-opt/ast-eval/BinaryExpr')
let OptClassBinaryExprEval = require('../../../evaluator/opt-evaluator/class-opt/ast-eval/BinaryExpr')
let BinaryExprLookup = require('../../../optimizer/variable-opt/ast-lookup/BinaryExpr')

let BinaryExprEval = BinaryExprEvalEnableArray || BinaryExprEvalEnableClass || BasicBinaryExprEval
let OptBinaryExprEval = OptClassBinaryExprEval || OptVariableBinaryExprEval

@BinaryExprLookup
@OptBinaryExprEval
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
