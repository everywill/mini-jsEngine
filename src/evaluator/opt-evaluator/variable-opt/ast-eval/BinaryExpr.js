const mixin = require('../../../../utils/decorator-mixin')
const Name = require('../../../../parser/basic-parser/ast/Name')

const BinaryExprEval = mixin({
  computeAssign(env, rvalue) {
    let left = this.left
    if (left instanceof Name) {
      left.evalForAssign(env, rvalue)
      return rvalue
    } else {
      throw 'invalid assignment'
    }
  },
})

module.exports = BinaryExprEval
