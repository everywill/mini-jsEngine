const ASTList = require('../../ast-root/ASTList')

class TypeTag extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  static UNDEF = '<Undef>'

  get type() {
    if (this.numChildren) {
      return this.child(0).name
    } 
    return TypeTag.UNDEF
  }

  toString() {
    return `:${this.type}`
  }
}

module.exports = TypeTag
