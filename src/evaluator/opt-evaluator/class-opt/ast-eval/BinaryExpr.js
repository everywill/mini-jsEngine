const mixin = require('../../../../utils/decorator-mixin')
const Name = require('../../../../parser/basic-parser/ast/Name')
const { PrimaryExpr } = require('../../../../parser/function-parser/ast')
const { Dot } = require('../../../../parser/class-parser/ast')
const OptStoneObject = require('../../OptStoneObject')

const BinaryExprEval = mixin({
  computeAssign(env, rvalue) {
    let left = this.left
    if (left instanceof Name) {
      left.evalForAssign(env, rvalue)
      return rvalue
    } else if (left instanceof PrimaryExpr) {
      if (left.hasPostfix(0) && left.postfix(0) instanceof Dot) {
        let target = left.evalSubExpr(env, 1)
        if (target instanceof OptStoneObject) {
          let name = left.postfix(0).name
          target.write(name, rvalue)
          
          return rvalue
        }
      }
    } else {
      throw 'invalid assignment'
    }
  }
})

module.exports = BinaryExprEval
