const mixin = require('../../../utils/decorator-mixin')

const ArrayLiteralEval = mixin({
  eval(env) {
    let res = []
    let i = 0
    for (let element of this) {
      res[i++] = element.eval(env)
    }
    return res
  }
})

module.exports = ArrayLiteralEval
