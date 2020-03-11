const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const VarStmntTypeChecker = mixin({
  typeCheck(typeEnv) {
    if (typeEnv.get(0, this.index)) {
      throw new Error(`duplicate variable: ${this.name}`)
    }
    const varType = TypeInfo.getTypeInfo(this.type)
    typeEnv.put(0, this.index, varType)
    const valueType = this.initializer.typeCheck(typeEnv)
    valueType.assertSubtypeOf(varType, typeEnv, this)
    return varType
  }
})

module.exports = VarStmntTypeChecker

