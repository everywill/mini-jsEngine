const mixin = require('../../../utils/decorator-mixin')

const ClassBodyEval = mixin({
  eval(env) {
    for (let cb of this) {
      cb.eval(env)
    }
    return null
  }
})

module.exports = ClassBodyEval
