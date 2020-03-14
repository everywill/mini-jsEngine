const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const WhileStmntTypeChecker = mixin({
  typeCheck(typeEnv) {
    const condType = this.condition.typeCheck(typeEnv)
    condType.assertSubtypeOf(TypeInfo.INT, typeEnv, this)

    const bodyType = this.body.typeCheck(typeEnv)
    // 如果未进入while循环，返回为0
    return bodyType.union(TypeInfo.INT, typeEnv)
  }
})

module.exports = WhileStmntTypeChecker
