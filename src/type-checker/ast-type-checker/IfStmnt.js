const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const IfStmntTypeChecker = mixin({
  typeCheck(typeEnv) {
    const condType = this.condition.typeCheck(typeEnv)
    condType.assertSubtypeOf(TypeInfo.INT, typeEnv, this)

    const thenType = this.thenBlock.typeCheck(typeEnv)
    let elseType
    const elseBlock = this.elseBlock
    if (!elseBlock) {
      elseType = TypeInfo.INT
    } else {
      elseType = elseBlock.typeCheck(typeEnv)
    }
    // IfStmnt返回类型需要被统一
    return thenType.union(elseType, typeEnv)
  }
})

module.exports = IfStmntTypeChecker
