const mixin = require('../../../utils/decorator-mixin')

const BlockStmntEval = mixin({
  eval(env) {
    let result = 0
    for (let stmnt of this) {
      result = stmnt.eval(env)
    }
    return result
  }
})

module.exports = BlockStmntEval
