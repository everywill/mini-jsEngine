const ASTLeaf = require('../../ast-root/ASTLeaf')
const NumberLiteralEval = require('../../../evaluator/basic-evaluator/ast-eval/NumberLiteral')

@NumberLiteralEval
class NumberLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get value() {
    return parseFloat(this.token.value)
  }
}

module.exports = NumberLiteral
