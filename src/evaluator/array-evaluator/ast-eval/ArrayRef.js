const mixin = require('../../../utils/decorator-mixin')

const ArrayRefEval = mixin({
  eval(env, target) {
    if (Array.isArray(target)) {
      let index = this.index.eval(env)

      if (typeof index === 'number' && Math.floor(index) === index) {
        // 确认为整数类型
        return target[index]
      }
      throw new Error(`bad array index: ${index}`)
    }
  }
})

module.exports = ArrayRefEval
