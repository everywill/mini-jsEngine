const ASTList = require('../../ast-root/ASTList')

class VarStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get type() {
    return this.child(1)
  }
  get initializer() {
    return this.child(2)
  }

  toString() {
    return `(var ${this.name} ${this.type} ${this.initializer})`
  }
}

module.exports = VarStmnt
