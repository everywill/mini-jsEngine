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
    return `at line ${this.token.lineNo}`
  }
}

class ASTList {
  constructor(tokenList) {
    this.children = tokenList
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
