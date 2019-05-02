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

module.exports = ClassInfo
