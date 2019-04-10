const { 
  StringLiteral,
  NumberLiteral,
  Name,
  ParameterList,
  Postfix,
  BinaryExpr,
  NegativeExpr,
  BlockStmnt,
  IfStmnt,
  WhileStmnt,
  funcStmnt,
} = require('../../evaluator/ast-eval')

class OpPrecedenceParser {
  constructor() {
    this.queue = []
    this.operators = {
      '=': { priority: 1, isLeftAssoc: false},
      '<': { priority: 2, isLeftAssoc: true },
      '<=': { priority: 2, isLeftAssoc: true },
      '>': { priority: 2, isLeftAssoc: true },
      '>=': { priority: 2, isLeftAssoc: true },
      '==': { priority: 2, isLeftAssoc: true },
      '+': { priority: 3, isLeftAssoc: true },
      '-': { priority: 3, isLeftAssoc: true },
      '*': { priority: 4, isLeftAssoc: true },
      '/': { priority: 4, isLeftAssoc: true },
      '%': { priority: 4, isLeftAssoc: true },
      '^': { priority: 5, isLeftAssoc: false },
    }

    this.reserved = ['if', 'else', 'while', 'func']

    let program = this.programGenerator()
    program.next()

    this.run = (token) => {
      // eslint-disable-next-line
      console.log('=== new token to parser ===')
      // eslint-disable-next-line
      console.log(token)
      return program.next(token)
    }
  }
  // [ statement ] (";" | EOL)
  * programGenerator() {
    let statements = []
    let s = yield* this.statement()
    statements.push(s)
    // ; 分割的statement
    while (yield* this.nextIsToken(';')) {
      
      s = yield* this.statement()
      statements.push(s)
    }
    return statements
  }
  // "if" expr block [ "else" block ] | "while" expr block | func |expression
  * statement() {
    if (yield* this.nextIsToken('if')) {
      let condition = yield* this.expression()
      let thenBlock = yield* this.block()
      
      if (yield* this.nextIsToken('else')) {
        let elseBlock = yield* this.block()
        return new IfStmnt([condition, thenBlock, elseBlock])
      } else {
        return new IfStmnt([condition, thenBlock])
      }
    } else if (yield* this.nextIsToken('while')) {
      let condition = yield* this.expression()
      let body = yield* this.block()
      return new WhileStmnt([condition, body])
    } else if (yield* this.nextIsToken('func')) {
      let f = yield* this.func()
      return f
    } else {
      let e = yield* this.expression()
      return e
    }
  }

  // "{" [ statement ] {(";" | EOL) [ statement ]} "}"
  * block() {
    let statements = []

    let token = yield* this.nextToken()
    if (token.value === '{') {
      // 代码块开始
      let s = yield* this.statement()
      statements.push(s)

      while (yield* this.nextIsToken(';')) {
        // ; 分割的statement 
        s = yield* this.statement()
        statements.push(s)
      }

      if (yield* this.nextIsToken('}')) {
        // 代码块结束
        return new BlockStmnt(statements)
      } else {
        throw new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`)
      }
    } else {
      return null
    }
  }

  // factor { OP factor }
  * expression() {
    let right = yield* this.factor()
    let next
    while ((next = yield* this.nextOperator()) != null) {
      right = yield* this.doShift(right, next)
    }

    return right
  }

  // "-" primary | primary
  * factor() {
    let token = yield* this.nextToken()
    if (token.value === '-') {
      let p = yield* this.primary()
      return new NegativeExpr([new Name(token), p])
    } else {
      this.queue.push(token)
      let p = yield* this.primary()
      return p
    }
  }
  
  // "(" expr ")" | NUMBER | IDENTIFIER | STRING
  * primary() {
    let token = yield* this.nextToken()
    if (token.value === '(') {
      // "(" expr ")"
      let e = yield* this.expression()
      
      let anotherToken = yield* this.nextToken()
      // console.log('anotherToken: ')
      // console.log(anotherToken)
      if (anotherToken.value === ')') {
        // 括号能匹配 返回表达式
        return e
      } else {
        // 否则解析出错
        throw  new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`)
      } 
    } else if (token.type === 'number') {
      // NUMBER
      return new NumberLiteral(token)
    } else if (token.type === 'identifier') {
      // IDENTIFIER
      return new Name(token)
    } else if (token.type === 'string') {
      // STRING
      return new StringLiteral(token)
    } else {
      throw new Error(`Parse Error: bad factor at line ${token.lineNo}: ${token.value}`)
    }
  }
  * nextOperator() {
    let token = yield* this.nextToken()

    if (token && token.type === 'identifier' && this.operators[token.value]) {
      return token
    } else {
      this.queue.push(token)
      return null
    }
  }
  * nextToken() {
    let token
    // console.log('queue in nextToken: ')
    // console.log(this.queue)
    if (this.queue.length) {
      token = this.queue.pop()
    } else {
      token = yield
    }
    return token
  }
  * nextIsToken(name) {
    let next = yield* this.nextToken()
    if (next && next.value === name) {
      return true
    } else {
      this.queue.push(next)
      return false
    }
  }
  * doShift(left, op) {
    let right = yield* this.factor()
    let next
    while ((next = yield* this.nextOperator()) != null) {
      if (this.rightIsExpr(op, next)) {
        right = yield* this.doShift(right, next)
      } else {
        this.queue.push(next)
        break
      }
    }
    // console.log('right in doShift: ')
    // console.log(right)
    return new BinaryExpr([left, new Name(op), right])
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
    console.log('result of parser:')
    console.log(result.value.toString())
    return result.value
  }
}

module.exports = OpPrecedenceParser
