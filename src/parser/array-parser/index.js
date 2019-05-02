const { overridePrimary, overridePostfix } = require('./override')
const ClassParser = require('../class-parser')
const ClosureParser = require('../closure-parser')
const FunctionParser = require('../function-parser')

let SuperClass = ClassParser || ClosureParser || FunctionParser

// ("[" [ elements ] "]" | " closure " paramlist block | "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
@overridePrimary
// "(" [ expr { "," expr } ] ")" | "." IDENTIFIER | "[" expr "]"
@overridePostfix
class ArrayParser extends SuperClass {
  * elements() {
    let elements = []
    let e = yield* this.expression()
    elements.push(e)
    // , 分割的数组元素
    while (yield* this.checkNextToken(',')) {
      e = yield* this.expression()
      elements.push(e)
    }
    return elements
  }
}

module.exports = ArrayParser
