const mixin = require('../../../utils/decorator-mixin')
const VmFunction = require('../VmFunction')

const FuncStmntEval = mixin({
  eval(env) {
    const code = env.code
    const entry = code.position
    this.compile(code)
    env.put(0, this.index, new VmFunction(this.parameters, this.body, env, entry))
    return this.name
  },
})

module.exports = FuncStmntEval
