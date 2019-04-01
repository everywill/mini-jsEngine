class ASTLeaf {
  constructor(token) {
    this.token = token
  }
  [Symbol.iterator]() {
    return [].values()
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
  child(i) {
    return this.children[i]
  }
  numChildren() {
    return this.children.length
  }
}

class NumberLiteral extends ASTLeaf {
  get value() {
    return parseFloat(this.token.value)
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
