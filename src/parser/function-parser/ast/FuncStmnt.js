const ASTList = require('../../ast-root/ASTList')
const FuncStmntEval = require('../../../evaluator/function-evaluator/ast-eval/FuncStmnt')
const OptFuncStmntEval = require('../../../evaluator/opt-evaluator/variable-opt/ast-eval/FuncStmnt')
const FuncStmntLookup = require('../../../optimizer/variable-opt/ast-lookup/FuncStmnt')
const MethodLookup = require('../../../optimizer/class-opt/ast-lookup/FuncStmnt')

@MethodLookup
@FuncStmntLookup
@OptFuncStmntEval
@FuncStmntEval
class FuncStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get parameters() {
    return this.child(1)
  }
  get body() {
    return this.child(2)
  }
  toString() {
    return `(func ${this.name} ${this.parameters} ${this.body})`
  }
}

module.exports = FuncStmnt
