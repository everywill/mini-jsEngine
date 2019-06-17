const FunctionEntity = require('../evaluator/function-evaluator/FunctionEntity')

class VmFunction extends FunctionEntity {
  constructor(parameters, body, env, entry) {
    super(parameters, body, env)
    this.entry = entry
  }
}

module.exports = VmFunction
