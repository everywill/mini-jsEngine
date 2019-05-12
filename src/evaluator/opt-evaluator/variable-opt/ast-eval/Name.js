const mixin = require('../../../../utils/decorator-mixin')

const NameEval = mixin({
  eval(env) {
    // console.log(`eval name ${this.name}:`)
    // console.log(`index in env: ${this.index}`)
    let value
    if (this.index !== undefined) {
      value = env.get(this.nestHierarchy, this.index)
    } else {
      value = env.get(this.name)
    }
    // console.log(value)
    return value
  },
  evalForAssign(env, rvalue) {
    // console.log(`evalForAssign name ${this.name}`)
    // console.log(`index in env: ${this.index}`)
    if (this.index !== undefined) {
      env.put(this.nestHierarchy, this.index, rvalue)
    }  else {
      env.put(this.name, rvalue)
    }
  }
})

module.exports = NameEval
