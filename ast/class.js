const { ASTList } = require('./root-type')

class ClassInfo {
  constructor(classStmnt, env) {
    this.definition = classStmnt
    this.env = env
    let obj = env.get(classStmnt.superClass)
    if (!obj) {
      this.super = null
    } else if (obj instanceof ClassInfo) {
      this.super = obj
    } else {
      throw new Error(`unkown super class: ${classStmnt.superClass}`)
    }
  }
  get name() {
    return this.definition.name
  }
  get superClass() {
    return this.super
  }
  get body() {
    return this.definition.body
  }
  get environment() {
    return this.env
  }
  toString() {
    return `<class ${this.name} >`
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
  eval(env) {
    let classInfo = new ClassInfo(this, env)
    env.put(this.name, classInfo)
    return this.name
  }
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
