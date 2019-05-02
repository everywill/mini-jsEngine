const ASTList = require('../../ast-root/ASTList')
const ArrayLiteralEval = require('../../../evaluator/array-evaluator/ast-eval/ArrayLiteral')

@ArrayLiteralEval
class ArrayLiteral extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
}

module.exports = ArrayLiteral
