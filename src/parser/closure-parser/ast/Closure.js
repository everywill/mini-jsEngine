const ASTList = require('../../ast-root/ASTList')
const ClosureEval = require('../../../evaluator/closure-evaluator/ast-eval/Closure')
const OptClosureEval = require('../../../evaluator/opt-evaluator/variable-opt/ast-eval/Closure')
const ClosureLookup = require('../../../optimizer/variable-opt/ast-lookup/Closure')

@ClosureLookup
@OptClosureEval
@ClosureEval
class Closure extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get parameters() {
    return this.child(0)
  }
  get body() {
    return this.child(1)
  }
  toString() {
    return `(closure ${this.parameters} ${this.body})`
  }
}

module.exports = Closure
