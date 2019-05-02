const ASTList = require('../../ast-root/ASTList')
const ArgumentsEval = require('../../../evaluator/function-evaluator/ast-eval/Arguments')

@ArgumentsEval
class Arguments extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
}

module.exports = Arguments
