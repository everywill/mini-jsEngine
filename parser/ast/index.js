class ASTLeaf {
  constructor(token) {
    this.token = token
  }
  toString() {
    return this.token.value
  }
}

class ASTList {
  constructor(list) {
    this.children = list
  }
  toString() {
    let s = '('
    for (let child of this.children) {
      s = s + child.toString()
    }
    return s + ')'
  }
}

class NumberLiteral extends ASTLeaf {
  get value() {
    reutrn parseFloat(this.token.value)
  }
}

class Name extends ASTLeaf {
  get name() {
    return this.token.value
  }
}

class BinaryExpr extends ASTList {
  get left() {
    return this.children(0)
  }
  get operator() {
    return this.children(1)
  }
  get right() {
    return this.children(2)
  }
}

module.exports = {
  NumberLiteral,
  Name,
  BinaryExpr,
}
