const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const WhileStmntTypeChecker = mixin({
  typeCheck(typeEnv) {
    const condType = this.condition.typeCheck(typeEnv)
    condType.assertSubtypeOf(TypeInfo.INT, typeEnv, this)

    const bodyType = this.body.typeCheck(typeEnv)
    return bodyType
  }
})

module.exports = WhileStmntTypeChecker
