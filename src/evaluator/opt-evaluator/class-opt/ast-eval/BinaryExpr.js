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
          // let name = left.postfix(0).name
          // target.write(name, rvalue)
          // return rvalue
          return this.setField(target, left.postfix(0), rvalue)
        } else {
          // console.log(this.left.toString())
          throw new Error('bad assign: target not a OptStoneObject')
        }
      }
    } else {
      throw 'invalid assignment'
    }
  },
  setField(optStoneObject, dot, rvalue) {
    // let name = dot.name
    // optStoneObject.write(name, rvalue)

    if (optStoneObject.optClassInfo !== this.optClassInfo) {
      this.optClassInfo = optStoneObject.optClassInfo

      let member = dot.name
      
      let index = this.optClassInfo.fieldIndex(member)
      if (index === -1) {
        throw new Error(`bad member access: ${member}`)
      }
      this.index = index
    }

    optStoneObject.write(this.index, rvalue)

    return rvalue
  }
})

module.exports = BinaryExprEval
