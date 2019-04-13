const { ASTList } = require('./root-type')

class ClassBody extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

class ClassStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get body() {
    return this.child(this.numChildren - 1)
  }
  toString() {
    
  }
}

module.exports = {
  ClassBody,
  ClassStmnt,
}
