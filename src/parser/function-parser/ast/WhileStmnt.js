const ASTList = require('../../ast-root/ASTList')
const WhileStmntEval = require('../../../evaluator/basic-evaluator/ast-eval/WhileStmnt')

@WhileStmntEval
class WhileStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get condition() {
    return this.child(0)
  }
  get body() {
    return this.child(1)
  }
  toString() {
    return `(while ${this.condition} ${this.body})`
  }
}

module.exports = WhileStmnt
