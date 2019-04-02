const { NumberLiteral, Name, BinaryExpr } = require('../ast')

const WAIT_FACTOR_TOKEN = 0
const WAIT_OPERATOR_TOKEN = 1

class OpPrecedenceParser {
  constructor() {
    this.queue = []
    this.operators = {
      '<': { priority: 1, isLeftAssoc: true },
      '>': { priority: 1, isLeftAssoc: true },
      '+': { priority: 2, isLeftAssoc: true },
      '-': { priority: 2, isLeftAssoc: true },
      '*': { priority: 3, isLeftAssoc: true },
      '/': { priority: 4, isLeftAssoc: true },
      '^': { priority: 1, isLeftAssoc: false },
    }

    let expression = this.expressionGenerator()
    expression.next()

    this.run = (token) => {
      // eslint-disable-next-line
      console.log('=== new token to parser ===')
      // eslint-disable-next-line
      console.log(token)
      return expression.next(token)
    }
  }

  * expressionGenerator() {
    let right = yield* this.factor()
    let next
    if ((next = yield* this.nextOperator()) != null) {
      right = yield* this.doShift(right, next)
    }

    return right
  }

  * factor() {
    let token = yield
    if (token.value === '(') {
      // 出现括号表达式
      let e = this.expression()
      let anotherToken = yield
      if (anotherToken.value === ')') {
        // 括号能匹配 返回表达式
        return e
      } else {
        // 否则解析出错
        throw 'Parse Error: no matching bracket'
      } 
    } else {
      if (token.type === 'number') {
        // 单词是数字类型
        return new NumberLiteral(token)
      } else {
        throw 'Parse Error: no valid number '
      }
    }
  }

  * nextOperator() {
    let token = yield
    if (token && token.type === 'identifier') {
      return new Name(token)
    } else {
      return null
    }
  }

  * doShift(left, op) {
    let right = yield* this.factor()
    let next
    while ((next = yield* this.nextOperator()) != null && this.rightIsExpr(op, next)) {
      right = yield* this.doShift(right, next)
    }

    return new BinaryExpr([left, op, right])
  }

  rightIsExpr(op, nextOp) {
    const opInfo = this.operators[op.value]
    const nextOpInfo = this.operators[nextOp.value]

    if (nextOpInfo.isLeftAssoc) {
      return opInfo.priority < nextOpInfo.priority
    } else {
      return opInfo.priority <= nextOpInfo.priority
    }
  }

  end() {
    // eslint-disable-next-line
    console.log('=== parser end has been invoked ===')
    let result = this.run(null)
    // eslint-disable-next-line
    console.log(result.value)
  }
}

module.exports = new OpPrecedenceParser()
