const { ASTList } = require('./root-type')

class ParameterList extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  name(i) {
    return this.child(i).name
  }
  get size() {
    return this.numChildren()
  }
}

class Postfix extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

class FuncStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get parameters() {
    return this.child(1)
  }
  get body() {
    return this.child(2)
  }
  toString() {
    return `(func ${this.name} ${this.parameters} ${this.body})`
  }
}

module.exports = {
  ParameterList, 
  Postfix,
  FuncStmnt,
}
