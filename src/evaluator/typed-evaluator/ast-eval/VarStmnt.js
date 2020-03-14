const mixin = require('../../../utils/decorator-mixin')

const VarStmntEval = mixin({
  lookup(symbols) {
    this.index = symbols.putNew(this.name)
    this.initializer.lookup(symbols)
  },
  eval(env) {
    const value = this.initializer.eval(env)
    env.put(0, this.index, value)
    return value
  }
})

module.exports = VarStmntEval
