const { ASTLeaf, ASTList } = require('./root-type')

class StringLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get value() {
    return this.token.value
  }
}

class NumberLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get value() {
    return parseFloat(this.token.value)
  }
}

class Name extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get name() {
    return this.token.value
  }
}

class BinaryExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get left() {
    return this.child(0)
  }
  get operator() {
    return this.child(1)
  }
  get right() {
    return this.child(2)
  }
}

class NegativeExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get operand() {
    return this.child(1)
  }
  toString() {
    return `-${this.operand}`
  }
}

class BlockStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

class IfStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get condition() {
    return this.child(0)
  }
  get thenBlock() {
    return this.child(1)
  }
  get elseBlock() {
    return this.numChildren() > 2 ? this.child(2) : null
  }
  toString() {
    return `(if ${this.condition} ${this.thenBlock} else ${this.elseBlock})`
  }
}

class WhileStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get condition() {
    return this.child(0)
  }
  get body() {
    return this.child(1)
  }
  toString() {
    return `(while ${this.condition} ${this.body})`
  }
}

module.exports = {
  StringLiteral,
  NumberLiteral,
  Name,
  BinaryExpr,
  NegativeExpr,
  BlockStmnt,
  IfStmnt,
  WhileStmnt,
}
