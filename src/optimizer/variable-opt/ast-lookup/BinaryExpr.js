const mixin = require('../../../utils/decorator-mixin')
const Name = require('../../../parser/basic-parser/ast/Name')

const BinaryExprLookup = mixin({
  lookup(symbols) {
    let op = this.operator.name
    if (op === '=') {
      // console.log(this.left.toString())
      // console.log(this.left instanceof Name)
      if (this.left instanceof Name) {
        this.left.lookupForAssign(symbols)
        this.right.lookup(symbols)
        return
      }
    }
    this.left.lookup(symbols)
    this.right.lookup(symbols)
  }
})

module.exports = BinaryExprLookup
