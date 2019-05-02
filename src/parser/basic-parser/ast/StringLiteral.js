const ASTLeaf = require('../../ast-root/ASTLeaf')
const StringLiteralEval = require('../../../evaluator/basic-evaluator/ast-eval/StringLiteral')

@StringLiteralEval
class StringLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get value() {
    return this.token.value
  }
  eval() {
    return this.value
  }
}

module.exports = StringLiteral
