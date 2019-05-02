const NestedEnv = require('./NestedEnv')
const NativeFunction = require('../native-evaluator/NativeFunction')

// 增加对原生函数的支持
class NativeFuncEnv extends NestedEnv {
  constructor(env) {
    super(env)
    this.appendNatives(this)
  }
  appendNatives(env) {
    // eslint-disable-next-line
    this.append(env, 'log', console.log)
  }
  append(env, name, method) {
    env.put(name, new NativeFunction(name, method))
  }
}

module.exports = NativeFuncEnv
