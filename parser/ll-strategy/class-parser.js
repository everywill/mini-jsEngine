const NativeFuncParser = require('./native-func-parser')
const { Name, ClassBody, ClassStmnt } = require('../../ast')

class ClassParser extends NativeFuncParser {
  * member() {
    if (yield* this.checkNextToken('func')) {
      return yield* this.func()
    } else {
      return yield* this.expression()
    }
  }
  * classBody() {
    let members = []

    let token = yield* this.nextToken()
    if (token.value === '{') {
      // 类成员定义开始
      let m
      while(yield* this.checkNextToken('}', false)) {
        // console.log('enter paramlist while')
        m = yield* this.member()
        members.push(m)
        if (yield* this.checkNextToken(';')) {
          continue
        }
      }

      // 代码块结束
      return new ClassBody(members)
    } else {
      throw new Error(`Parse Error: block missing { at ${token.lineNo}`)
    }
  }
  * classDef() {
    let name
    let token = yield* this.nextToken()
    if (token.type === 'identifier') {
      name = new Name(token)
    } else {
      throw new Error(`Parse Error: bad class name ${token.value} at line ${token.lineNo}`)
    }
  }
}

module.exports = ClassParser
