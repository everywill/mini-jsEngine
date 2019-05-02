const ASTList = require('../../ast-root/ASTList')
const ParameterListEval = require('../../../evaluator/function-evaluator/ast-eval/ParameterList')

@ParameterListEval
class ParameterList extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
  name(i) {
    return this.child(i).name
  }
}

module.exports = ParameterList
