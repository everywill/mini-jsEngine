class ASTLeaf {
  constructor(token) {
    this.token = token
  }
  [Symbol.iterator]() {
    return [][Symbol.iterator]()
  }
  toString() {
    return this.token.value
  }
  child() {
    throw 'no child'
  }
  numChildren() {
    return 0
  }
  location() {
    return `at line ${this.token.lineNo}`
  }
}

class ASTList {
  constructor(tokenList) {
    this.children = tokenList
  }
  [Symbol.iterator]() {
    return this.children[Symbol.iterator]()
  }
  toString() {
    let s = '('
    for (let child of this.children) {
      s = s + child.toString()
    }
    return s + ')'
  }
  child(i) {
    return this.children[i]
  }
  numChildren() {
    return this.children.length
  }
  location() {
    for (let child of this.children) {
      let l = child.location()
      if (l != null) {
        return l
      }
    }
    return null
  }
}

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

class funcStmnt extends ASTList {
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
    return `(function ${this.name} ${this.parameters} ${this.body})`
  }
}

module.exports = {
  StringLiteral,
  NumberLiteral,
  Name,
  ParameterList,
  Postfix,
  BinaryExpr,
  NegativeExpr,
  BlockStmnt,
  IfStmnt,
  WhileStmnt,
  funcStmnt,
}
