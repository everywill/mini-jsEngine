const OptFunctionEntity = require('../../opt-evaluator/OptFunction/index');

class VmFunction extends OptFunctionEntity {
  constructor(parameters, body, env, entry) {
    super(parameters, body, env)
    this.entry = entry
  }
}

module.exports = VmFunction
