const mixin = require('../../utils/decorator-mixin')

const ASTLeafTypeChecker = mixin({
  typeCheck(typeEnv) {
    // should be implemented by sub-class
  }
})

module.exports = ASTLeafTypeChecker
