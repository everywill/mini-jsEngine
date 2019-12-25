const mixin = require('../../../utils/decorator-mixin')

const ParameterList = mixin({
  eval(env, index, value) {
    env.stack[this.offsets[index]] = value
  }
})

module.exports = ParameterList