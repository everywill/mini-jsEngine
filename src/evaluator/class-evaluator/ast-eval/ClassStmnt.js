const mixin = require('../../../utils/decorator-mixin')
const ClassInfo = require('../ClassInfo')

const ClassStmntEval = mixin({
  eval(env) {
    let classInfo = new ClassInfo(this, env)
    env.put(this.name, classInfo)
    return this.name
  }
})

module.exports = ClassStmntEval
