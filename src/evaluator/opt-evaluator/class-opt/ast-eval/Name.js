const mixin = require('../../../../utils/decorator-mixin')
const { MemberSymbols } = require('../../../../optimizer/Symbols')

const NameEval = mixin({
  eval(env) {
    // console.log(`${this.name}: ${this.index}`)
    // console.log(env.names.nameTable)
    if (this.index === undefined) {
      return env.get(this.name)
    } else if (this.nestHierarchy === MemberSymbols.FIELD) {
      return this.getThis(env).read(this.index)
    } else if (this.nestHierarchy === MemberSymbols.METHOD) {
      return this.getThis(env).method(this.index)
    } else {
      return env.get(this.nestHierarchy, this.index)
    }
  },
  getThis(env) {
    return env.get(0, 0)
  },
  evalForAssign(env, rvalue) {
    // console.log(`${this.name}: ${this.index}`)
    // console.log(env.values)
    if (this.index === undefined) {
      env.put(this.name, rvalue)
      // console.log(env.names.nameTable)
    } else if (this.nestHierarchy === MemberSymbols.FIELD) {
      this.getThis(env).write(this.index, rvalue)
    } else if (this.nestHierarchy === MemberSymbols.METHOD) {
      throw new Error(`cannot update a method: ${this.name}`)
    } else {
      env.put(this.nestHierarchy, this.index, rvalue)
    }
  }
})

module.exports = NameEval
