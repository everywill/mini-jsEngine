const mixin = require('../../../utils/decorator-mixin')
const FunctionEntity = require('../../function-evaluator/FunctionEntity')

const ClosureEval = mixin({
  eval(env) {
    return new FunctionEntity(this.parameters, this.body, env)
  }
})

module.exports = ClosureEval
