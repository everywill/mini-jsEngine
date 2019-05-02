const mixin = require('../../../utils/decorator-mixin')
const Name = require('../../../parser/basic-parser/ast/Name')
const StoneObject = require('../../class-evaluator/StoneObject')
const { PrimaryExpr } = require('../../../parser/function-parser/ast')
const { Dot } = require('../../../parser/class-parser/ast')
const { ArrayRef } = require('../../../parser/array-parser/ast')

const BinaryExprEval = mixin({
  eval(env) {
    let op = this.operator.name
    if (op === '=') {
      let right = this.right.eval(env)

      return this.computeAssign(env, right)
    } else {
      let left = this.left.eval(env)
      let right = this.right.eval(env)

      return this.computeOp(left, op, right)
    }
  },
  computeAssign(env, rvalue) {
    let left = this.left
    if (left instanceof Name) {
      env.put(left.name, rvalue)
      return rvalue
    } else if (left instanceof PrimaryExpr) {
      // 引入class后增加对对象属性赋值功能
      if (left.hasPostfix(0) && left.postfix(0) instanceof Dot) {
        let target = left.evalSubExpr(env, 1)
        if (target instanceof StoneObject) {
          let name = left.postfix(0).name
          target.write(name, rvalue)
          
          return rvalue
        }
      // 引入数组后增加对数组元素赋值功能
      } else if (left.hasPostfix(0) && left.postfix(0) instanceof ArrayRef) {
        let target = left.evalSubExpr(env, 1)
        if (Array.isArray(target)) {
          let index = left.postfix(0).index.eval(env, target)
          if (typeof index === 'number' && Math.floor(index) === index) {
            target[index] = rvalue
            return rvalue
          }
          throw new Error(`bad array index: ${index}`)
        }
      }
    } else {
      throw 'invalid assignment'
    }
  },
  computeOp(lvalue, op, rvalue) {
    if (typeof lvalue === 'number' && typeof rvalue === 'number') {
      return this.computeNumber(lvalue, op, rvalue)
    } else {
      if (op === '+') {
        // 字符串拼接
        return `${lvalue}${rvalue}`
      } else if (op === '==') {
        return lvalue == rvalue
      } else {
        throw 'bad type'
      }
    }
  },
  computeNumber(lvalue, op, rvalue) {
    if (op === '+') {
      return lvalue + rvalue
    } else if (op === '-') {
      return lvalue - rvalue
    } else if (op === '*') {
      return lvalue * rvalue
    } else if (op === '/') {
      return lvalue / rvalue
    } else if (op === '%') {
      return lvalue % rvalue
    } else if (op === '==') {
      return lvalue == rvalue
    } else if (op === '>') {
      return lvalue > rvalue
    } else if (op === '<') {
      return lvalue < rvalue
    } else {
      throw 'invalid operator'
    }
  }
})

module.exports = BinaryExprEval
