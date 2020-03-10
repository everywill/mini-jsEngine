const mixin = require('../../../utils/decorator-mixin')
const Name = require('../../../parser/basic-parser/ast/Name')

const BinaryExprEval = mixin({
  eval(env) {
    const op = this.operator.name
    if (op === '=') {
      const right = this.right.eval(env)

      return this.computeAssign(env, right)
    } else {
      const left = this.left.eval(env)
      const right = this.right.eval(env)

      return this.computeOp(left, op, right)
    }
  },
  computeAssign(env, rvalue) {
    let left = this.left
    if (left instanceof Name) {
      env.put(left.name, rvalue)
      return rvalue
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
