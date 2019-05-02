const ASTList = require('../../ast-root/ASTList')
const ClassBodyEval = require('../../../evaluator/class-evaluator/ast-eval/ClassBody')

@ClassBodyEval
class ClassBody extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

module.exports = ClassBody
