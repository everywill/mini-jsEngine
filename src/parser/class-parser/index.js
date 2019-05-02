const { Name } = require('../basic-parser/ast')
const { ClassBody, ClassStmnt } = require('./ast')
const { overridePostfix, overrideStatement } = require('./override')
const ClosureParser = require('../closure-parser')
const FunctionParser = require('../function-parser')

let SuperParser = ClosureParser || FunctionParser

// "(" [ expr { "," expr } ] ")" | "." IDENTIFIER
@overridePostfix
// "if" expr block [ "else" block ] | "while" expr block | func | class | expression
@overrideStatement
class ClassParser extends SuperParser {
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
    let superClass
    let classBody
    let token = yield* this.nextToken()
    if (token.type === 'identifier') {
      name = new Name(token)
    } else {
      throw new Error(`Parse Error: bad class name ${token.value} at line ${token.lineNo}`)
    }
    if (yield* this.checkNextToken('extends')) {
      let token = yield* this.nextToken()
      if (token.type === 'identifier') {
        superClass = new Name(token)
      } else {
        throw new Error(`Parse Error: bad superclass name ${token.value} at line ${token.lineNo}`)
      }
    }
    classBody = yield* this.classBody()
    if (superClass) {
      return new ClassStmnt([name, superClass, classBody])
    }
    return new ClassStmnt([name, classBody])
  }
}

module.exports = ClassParser
