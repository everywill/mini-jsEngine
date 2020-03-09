const mixin = require('../../../utils/decorator-mixin')

const ParameterList = mixin({
  eval(env, index, value) {
    const vm = env.stoneVM
    vm.stack[this.offsets[index]] = value
  }
})

module.exports = ParameterList
