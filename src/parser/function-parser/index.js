const { 
  StringLiteral,
  NumberLiteral,
  Name,
  BinaryExpr,
  NegativeExpr,
  BlockStmnt,
  IfStmnt,
  WhileStmnt,
  ParameterList,
  FuncStmnt,
  Arguments,
  PrimaryExpr
} = require('./ast')

class FunctionParser {
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

    this.reserved = ['if', 'else', 'while', 'func', '(', ')', '{', '}']

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
    while (yield* this.checkNextToken(';')) {
      s = yield* this.statement()
      statements.push(s)
    }
    return statements
  }

  * func() {
    let name
    let paramList
    let body
    // IDENTIFIER
    let token = yield* this.nextToken()
    if (token.type === 'identifier') {
      name = new Name(token)
    } else {
      throw new Error(`Parse Error: bad func name ${token.value} at line ${token.lineNo}`)
    }

    paramList = yield* this.paramlist()
    body = yield* this.block()

    return new FuncStmnt([name, paramList, body])
  }
  // "(" [ param { "," param } ] ")"
  * paramlist() {
    let params = []
    let token = yield* this.nextToken()
    if (token.value === '(') {
      let next
      while(yield* this.checkNextToken(')', false)) {
        // console.log('enter paramlist while')
        next = yield* this.param()
        // console.log(`push to paramlist: ${next.toString()}`)
        params.push(next)
        if (yield* this.checkNextToken(',')) {
          continue
        }
      }

      return new ParameterList(params)
    }
  }
  // IDENTIFIER
  * param() {
    let token = yield* this.nextToken()
    if (token.type === 'identifier') {
      return new Name(token)
    } else {
      this.queue.push(token)
      return null
    }
  }
  // "(" [ expr { "," expr } ] ")"
  * postfix() {
    let args = []
    let token = yield* this.nextToken()
    if (token && token.value === '(') {
      let next
      while(yield* this.checkNextToken(')', false)) {
        // 尚未到调用结尾
        next = yield* this.expression()
        args.push(next)
        if (yield* this.checkNextToken(',')) {
          continue
        }
      }

      return new Arguments(args)
    } else {
      this.queue.push(token)
      return null
    } 
  }
  
  // "if" expr block [ "else" block ] | "while" expr block | expression
  * statement() {
    if (yield* this.checkNextToken('if')) {
      let condition = yield* this.expression()
      let thenBlock = yield* this.block()
      
      if (yield* this.checkNextToken('else')) {
        let elseBlock = yield* this.block()
        return new IfStmnt([condition, thenBlock, elseBlock])
      } else {
        return new IfStmnt([condition, thenBlock])
      }
    } else if (yield* this.checkNextToken('while')) {
      let condition = yield* this.expression()
      let body = yield* this.block()
      return new WhileStmnt([condition, body])
    } else if (yield* this.checkNextToken('func')) {
      // 增加函数解析
      return yield* this.func()
    } else {
      return yield* this.expression()
    }
  }

  // "{" [ statement ] {(";" | EOL) [ statement ]} "}"
  * block() {
    let statements = []

    let token = yield* this.nextToken()
    if (token.value === '{') {
      // 代码块开始
      let s
      while(yield* this.checkNextToken('}', false)) {
        // console.log('enter paramlist while')
        s = yield* this.statement()
        statements.push(s)
        if (yield* this.checkNextToken(';')) {
          continue
        }
      }

      // 代码块结束
      return new BlockStmnt(statements)
    } else {
      throw new Error(`Parse Error: block missing { at ${token.lineNo}`)
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
  * primary() {
    let p // primary
    let a = []// args

    let token = yield* this.nextToken()
    if (token.value === '(') {
      // "(" expr ")"
      let e = yield* this.expression()
      
      let anotherToken = yield* this.nextToken()
      // console.log('anotherToken: ')
      // console.log(anotherToken)
      if (anotherToken.value === ')') {
        // 括号能匹配 返回表达式
        p = e
      } else {
        // 否则解析出错
        throw  new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`)
      } 
    } else if (token.type === 'number') {
      // NUMBER
      p = new NumberLiteral(token)
    } else if (token.type === 'identifier') {
      // IDENTIFIER
      if (this.reserved.indexOf(token.value) === -1) {
        p = new Name(token)
      } else {
        throw new Error(`Parse Error: bad Name ${token.value} at line ${token.lineNo}`)
      }
    } else if (token.type === 'string') {
      // STRING
      p = new StringLiteral(token)
    } else {
      throw new Error(`Parse Error: bad factor at line ${token.lineNo}: ${token.value}`)
    }

    let postfix
    while((postfix = yield* this.postfix()) !== null) {
      a.push(postfix)
    }
    if (a.length) {
      return new PrimaryExpr([p, ...a])
    } else {
      return p
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
  * checkNextToken(name, condition = true) {
    let next = yield* this.nextToken()
    let result

    if (next && next.value === name) {
      result = condition 
    } else {
      this.queue.push(next)
      result = !condition
    }
    
    return result
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
    if (!result.value && result.done) {
      throw new Error('Parse Error: early termination')
    }
    // eslint-disable-next-line
    console.log('result of parser:')
    // eslint-disable-next-line
    console.log(result.value.toString())
    return result.value
  }
}

module.exports = FunctionParser
