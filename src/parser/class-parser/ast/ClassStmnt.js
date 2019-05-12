const ASTList = require('../../ast-root/ASTList')
const ClassStmntEval = require('../../../evaluator/class-evaluator/ast-eval/ClassStmnt')
const OptClassStmntEval = require('../../../evaluator/opt-evaluator/class-opt/ast-eval/ClassStmnt')
const ClassStmntLookup = require('../../../optimizer/class-opt/ast-lookup/ClassStmnt')

@ClassStmntLookup
@OptClassStmntEval
@ClassStmntEval
class ClassStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get superClass() {
    if (this.numChildren < 3) {
      return '*'
    }
    return this.child(1).name
  }
  get body() {
    return this.child(this.numChildren - 1)
  }
  toString() {
    let parent = this.superClass
    // parent = parent || '*'
    return `(class ${this.name} ${parent} ${this.body})`
  }
}

module.exports = ClassStmnt
