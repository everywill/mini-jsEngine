const { Name } = require('../basic-parser/ast')
const { 
  ParameterList,
  FuncStmnt,
  Arguments,
} = require('./ast')
const { 
  overrideStatement,
  overridePrimary, 
} = require('./override')

const BasicParser = require('../basic-parser')

// ( "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
@overridePrimary
// "if" expr block [ "else" block ] | "while" expr block | func | expression
@overrideStatement
class FunctionParser extends BasicParser {
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
}

module.exports = FunctionParser
