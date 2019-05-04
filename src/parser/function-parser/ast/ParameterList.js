const ASTList = require('../../ast-root/ASTList')
const ParameterListEval = require('../../../evaluator/function-evaluator/ast-eval/ParameterList')
const OptParameterListEval = require('../../../evaluator/opt-evaluator/ast-eval/ParameterList')
const ParameterListLookup = require('../../../optimizer/ast-lookup/ParameterList')

@ParameterListLookup
@OptParameterListEval
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
