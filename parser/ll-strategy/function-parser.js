const { 
  Name,
  ParameterList,
  Postfix,
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
    if (token.value === '(') {
      let next
      while((next = yield* this.param()) !== null) {
        args.push(next)
        if ((yield* this.nextIsToken(',')) === false) {
          break
        }
      }
      if (yield* this.nextIsToken(')')) {
        return new Postfix(args)
      } else {
        throw new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`)
      }
    }
  }
}

module.exports = FunctionParser
