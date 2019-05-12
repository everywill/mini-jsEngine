const ASTList = require('../../ast-root/ASTList')
const ClassBodyEval = require('../../../evaluator/class-evaluator/ast-eval/ClassBody')
const OptClassBodyEval = require('../../../evaluator/opt-evaluator/class-opt/ast-eval/ClassBody')
const ClassBodyLookup = require('../../../optimizer/class-opt/ast-lookup/ClassBody')

@ClassBodyLookup
@OptClassBodyEval
@ClassBodyEval
class ClassBody extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

module.exports = ClassBody
