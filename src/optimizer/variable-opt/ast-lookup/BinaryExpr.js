const mixin = require('../../../utils/decorator-mixin')

const BinaryExprLookup = mixin({
  lookup(symbols) {
    let op = this.operator.name
    if (op === '=') {
      this.left.lookupForAssign(symbols)
    } else {
      this.left.lookup(symbols)
    }
    this.right.lookup(symbols)
  }
})

module.exports = BinaryExprLookup
