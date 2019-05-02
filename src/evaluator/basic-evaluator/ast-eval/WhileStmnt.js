const mixin = require('../../../utils/decorator-mixin')

const WhileStmntEval = mixin({
  eval(env) {
    let result = 0
    for(;;) {
      let condition = this.condition.eval(env)
      if (condition == false) {
        return result
      } else {
        this.body.eval(env)
      }
    }
  }
})

module.exports = WhileStmntEval
