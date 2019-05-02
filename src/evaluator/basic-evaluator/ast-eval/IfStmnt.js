const mixin = require('../../../utils/decorator-mixin')

const IfStmntEval = mixin({
  eval(env) {
    let condition = this.condition.eval(env)
    if (condition != false) {
      return this.thenBlock.eval(env)
    } else {
      let b = this.elseBlock
      if (b == null) {
        return 0
      } else {
        return b.eval(env)
      }
    }
  }
})

module.exports = IfStmntEval
