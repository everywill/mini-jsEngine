const ASTLeaf = require('../../ast-root/ASTLeaf')
const NameEval = require('../../../evaluator/basic-evaluator/ast-eval/Name')

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
