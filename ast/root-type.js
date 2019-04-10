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

module.exports = {
  ASTList,
  ASTLeaf,
}
