const mixin = require('../../../utils/decorator-mixin')

const NameEval = mixin({
  eval(env) {
    // console.log(`eval name ${this.name}:`)
    // console.log(`index in env: ${this.index}`)
    let value
    if (this.index !== -1) {
      value = env.get(this.nestHierarchy, this.index)
    } else {
      value = env.get(this.name)
    }
    // console.log(value)
    return value
  },
  evalForAssign(env, value) {
    // console.log(`evalForAssign name ${this.name}`)
    // console.log(`index in env: ${this.index}`)
    if (this.index !== -1) {
      env.put(this.nestHierarchy, this.index, value)
    }  else {
      env.put(this.name, value)
    }
  }
})

module.exports = NameEval
