const mixin = require('../../../utils/decorator-mixin')

const NameEval = mixin({
  eval(env) {
    if (this.index !== -1) {
      return env.get(this.nestHierarchy, this.index)
    }
    return env.get(this.name)
  },
  evalForAssign(env, value) {
    if (this.index !== -1) {
      env.put(this.nestHierarchy, this.index, value)
    }  else {
      env.put(this.name, value)
    }
  }
})

module.exports = NameEval
