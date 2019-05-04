const OptFunction = require('../OptFunction')
const { ArrayEnv } = require('../../environment')

class OptMethod extends OptFunction {
  constructor(parameters, body, env, optStoneObject) {
    super(parameters, body, env)
    this.self = optStoneObject
  }
  makeEnv() {
    let env = new ArrayEnv(this.env)
    // 将自身置入
    env.put(0, 0, this.self)
    return env
  }
}

module.exports = OptMethod
