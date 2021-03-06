const mixin = require('../../../utils/decorator-mixin')
const { Name } = require('../../basic-parser/ast')
const { Arguments } = require('../../function-parser/ast')
const { Dot } = require('../../class-parser/ast')
const { ArrayRef } = require('../ast')

const overridePostfix = mixin({
  /* 
  **  "(" [ expr { "," expr } ] ")" | "." IDENTIFIER | "[" expr "]"
  */
  * postfix() {
    let args = []
    let token = yield* this.nextToken()
    if (token && token.value === '(') {
      let next
      while(yield* this.checkNextToken(')', false)) {
        // 尚未到调用结尾
        next = yield* this.expression()
        // console.log('args to push')
        // console.log(next)
        args.push(next)
        if (yield* this.checkNextToken(',')) {
          continue
        }
      }
      return new Arguments(args)
    } else if (token && token.value === '.') {
      // 引入class之后的链式调用
      let token = yield* this.nextToken()
      if (token.type === 'identifier') {
        return new Dot([new Name(token)])
      } else {
        throw new Error(`Parse Error: bad member name ${token.value} at line ${token.lineNo}`)
      }
    } else if (token && token.value === '[') {
      let e = yield* this.expression()
      if (yield* this.checkNextToken(']')) {
        return new ArrayRef([e])
      }
    } else {
      this.queue.push(token)
      return null
    } 
  }
})

module.exports = overridePostfix
