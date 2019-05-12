const ASTLeaf = require('../../ast-root/ASTLeaf')
const NameEval = require('../../../evaluator/basic-evaluator/ast-eval/Name')
const OptVariableNameEval = require('../../../evaluator/opt-evaluator/variable-opt/ast-eval/Name')
const OptClassNameEval = require('../../../evaluator/opt-evaluator/class-opt/ast-eval/Name')
const NameLookup = require('../../../optimizer/variable-opt/ast-lookup/Name')

const OptNameEval = OptClassNameEval || OptVariableNameEval

@NameLookup
@OptNameEval
@NameEval
class Name extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get name() {
    return this.token.value
  }
}

// console.log(typeof Name)

module.exports = Name
