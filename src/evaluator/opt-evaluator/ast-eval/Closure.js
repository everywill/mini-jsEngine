const mixin = require('../../../utils/decorator-mixin')
const OptFunction = require('../OptFunction')

const ClosureEval = mixin({
  eval(env) {
    return new OptFunction(this.parameters, this.body, env)
  }
})

module.exports = ClosureEval
