const ASTList = require('../../ast-root/ASTList')
const ArrayRefEval = require('../../../evaluator/array-evaluator/ast-eval/ArrayRef')

@ArrayRefEval
class ArrayRef extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get index() {
    return this.child(0)
  }
  toString() {
    return `[${this.index}]`
  }
}

module.exports = ArrayRef
