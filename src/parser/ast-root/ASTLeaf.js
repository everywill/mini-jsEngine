let ASTLeafLookup = require('../../optimizer/ast-lookup/ASTLeaf')

@ASTLeafLookup
class ASTLeaf {
  constructor(token) {
    this.token = token
  }
  [Symbol.iterator]() {
    return [][Symbol.iterator]()
  }
  get numChildren() {
    return 0
  }
  get location() {
    return `at line ${this.token.lineNo}`
  }
  child() {
    throw 'no child'
  }
  toString() {
    return this.token.value
  }
}

module.exports = ASTLeaf
