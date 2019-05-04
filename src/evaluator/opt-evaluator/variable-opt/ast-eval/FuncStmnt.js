const mixin = require('../../../../utils/decorator-mixin')
const OptFunction = require('../../OptFunction')

const FuncStmntEval = mixin({
  eval(env) {
    // 在当前env中保存函数定义
    env.put(0, this.index, new OptFunction(this.parameters, this.body, env))
    return this.name
  }
})

module.exports = FuncStmntEval
