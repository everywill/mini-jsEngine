const mixin = require('../../../utils/decorator-mixin')
const VmFunction = require('../VmFunction')

const FuncStmntEval = mixin({
  eval(env) {
    let funcName = this.name
    env.put(funcName, new VmFunction(this.parameters, this.body, env, entry))
  },
})

module.exports = FuncStmntEval