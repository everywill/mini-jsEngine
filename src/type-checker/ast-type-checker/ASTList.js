const mixin = require('../../utils/decorator-mixin')

const ASTListTypeChecker = mixin({
  typeCheck(typeEnv) {
    for (let astNode of this) {
      astNode.typeCheck(typeEnv)
    }
  }
})

module.exports = ASTListTypeChecker
