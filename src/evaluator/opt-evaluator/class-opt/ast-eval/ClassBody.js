const mixin = require('../../../../utils/decorator-mixin')
const { FuncStmnt } = require('../../../../parser/function-parser/ast')

const ClassBodyEval = mixin({
  eval(env) {
    for (let stmnt of this) {
      if (!(stmnt instanceof FuncStmnt)) {
        stmnt.eval(env)
      }
    }
  },
})

module.exports = ClassBodyEval
