const mixin = require('../../../utils/decorator-mixin')

const NameEval = mixin({
  eval(env) {
    // 对nestEnv同样适用
    let value = env.get(this.name)
    return value
  }
})

module.exports = NameEval
