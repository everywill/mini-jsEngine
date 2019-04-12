const { 
  Name,
  NumberLiteral,
  StringLiteral,
  PrimaryExpr,
  Closure,
} = require('../../ast')
const FunctionParser = require('./function-parser')

class ClosureParser extends FunctionParser {
  /* 
  **  override method primary in FunctionParser
  **  " fun " paramlist block | ( "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
  */
  * primary() {
    let p // primary
    let a = []// args

    let token = yield* this.nextToken()
    if (token.value === 'closure') {
      let paramList = yield* this.paramlist()
      let body = yield* this.block()
      p = new Closure([paramList, body])
    } else if (token.value === '(') {
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

module.exports = ClosureParser
