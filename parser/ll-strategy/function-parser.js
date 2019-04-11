const { 
  Name,
  NumberLiteral,
  StringLiteral,
  Arguments,
  ParameterList,
  PrimaryExpr,
  FuncStmnt,
} = require('../../ast')

const OpPrecedenceParser = require('./op-precedence-parser')

class FunctionParser extends OpPrecedenceParser {
  // "func" IDENTIFIER paramlist block
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
      while((next = yield* this.param()) !== null) {
        params.push(next)
        if ((yield* this.nextIsToken(',')) === false) {
          break
        }
      }
      if (yield* this.nextIsToken(')')) {
        return new ParameterList(params)
      } else {
        throw new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`)
      }
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
      while((next = yield* this.nextIsToken(')')) === false) {
        // 尚未到调用结尾
        next = yield* this.expression()
        // console.log('args to push')
        // console.log(next)
        args.push(next)
        if ((yield* this.nextIsToken(',')) === false) {
          break
        }
      }
      if (yield* this.nextIsToken(')')) {
        return new Arguments(args)
      } else {
        throw new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`)
      }
    } else {
      this.queue.push(token)
      return null
    }
  }
  /* 
  **  override method primary in OpPrecedenceParser
  **  ( "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
  */
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
      p = new Name(token)
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
}

module.exports = FunctionParser
