const mixin = require('../../../utils/decorator-mixin')
const VmFunction = require('../VmFunction/index')

const Arguments = mixin({
  eval(callerEnv, target) {
    if (target instanceof VmFunction) {
      // 仅支持VmFunction实例
      throw new Error('bad function')
    }
    const parameters = target.parameters
    if (this.size !== parameters.size) {
      throw new Error('bad number of arguments')
    }
    let num = 0
    for (let a of this) {
      parameters.eval(callerEnv, num++, a.eval(callerEnv))
    }
    const vm = callerEnv.stoneVM
    vm.run(target.entry)
    return vm.stack[0]
  }
})

module.exports = Arguments
