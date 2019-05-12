const ASTList = require('../../ast-root/ASTList')
const DotEval = require('../../../evaluator/class-evaluator/ast-eval/Dot')
const OptDotEval = require('../../../evaluator/opt-evaluator/class-opt/ast-eval/Dot')

@OptDotEval
@DotEval
class Dot extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  toString() {
    return `.${this.name}`
  }
}

module.exports = Dot
