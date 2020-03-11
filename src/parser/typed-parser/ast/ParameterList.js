const ASTList = require('../../ast-root/ASTList')
const ParameterListEval = require('../../../evaluator/function-evaluator/ast-eval/ParameterList')
const OptParameterListEval = require('../../../evaluator/opt-evaluator/variable-opt/ast-eval/ParameterList')
const ParameterListLookup = require('../../../optimizer/variable-opt/ast-lookup/ParameterList')

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
    return this.child(i).child(0).name
  }
  typeTag(i) {
    return this.child(i).child(1)
  }
}

module.exports = ParameterList
