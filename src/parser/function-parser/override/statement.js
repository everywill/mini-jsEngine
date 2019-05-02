const {
  IfStmnt,
  WhileStmnt,
} = require('../../basic-parser/ast')
const mixin = require('../../../utils/decorator-mixin')

const overrideStatement = mixin({
  // "if" expr block [ "else" block ] | "while" expr block | func | expression
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
})

module.exports = overrideStatement
