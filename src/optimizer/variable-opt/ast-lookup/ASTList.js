const mixin = require('../../../utils/decorator-mixin')

const ASTListLookup = mixin({
  lookup(symbols) {
    for (let astNode of this) {
      astNode.lookup(symbols)
    }
  }
})

module.exports = ASTListLookup
