const { ASTList } = require('./root-type')

class ClassInfo {
  constructor(classStmnt, env) {
    
  }
}

class ClassBody extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  eval(env) {}
}

class ClassStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get superClass() {
    if (this.numChildren < 3) {
      return null
    }
    return this.child(1).name
  }
  get body() {
    return this.child(this.numChildren - 1)
  }
  toString() {
    let parent = this.superClass
    parent = parent || '*'

    return `(class ${this.name} ${parent} ${this.body})`
  }
  eval(env) {}
}

class Dot extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  toString() {
    return `.${this.name}`
  }
  eval(env, target) {}
}

module.exports = {
  ClassBody,
  ClassStmnt,
  Dot,
}
