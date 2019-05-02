const ASTList = require('../../ast-root/ASTList')
let BasicArgumentsEval = require('../../../evaluator/function-evaluator/ast-eval/Arguments')
let ArgumentsEvalEnableNative = require('../../../evaluator/native-evaluator/ast-eval/Arguments')

let ArgumentsEval = ArgumentsEvalEnableNative || BasicArgumentsEval

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
