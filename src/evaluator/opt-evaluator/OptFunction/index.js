const FunctionEntity = require('../../function-evaluator/FunctionEntity')
const { ArrayEnv } = require('../../environment')

class OptFunction extends FunctionEntity {
  makeEnv() {
    return new ArrayEnv(this.env)
  }
}

module.exports = OptFunction
