const mixin = require('../../../utils/decorator-mixin')

const ParameterListEval = mixin({
  eval(env, index, value) {
    env.put(0, this.offsets[index], value)
  }
})

module.exports = ParameterListEval
