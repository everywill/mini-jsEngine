const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')
const TypeEnv = require('../TypeEnv')

const FuncStmntTypeChecker = mixin({
  typeCheck(typeEnv) {
    const paramTypes = this.parameters.types()
    const retType = TypeInfo.getTypeInfo(this.type)
    this.funcType = TypeInfo.functionType(retType, paramTypes)

    const oldType = typeEnv.put(0, this.index, this.funcType)
    if (oldType) {
      throw new Error(`function redefinition: `)
    }

    const bodyEnv = new TypeEnv(typeEnv)
    for (let i = 0; i < paramTypes.length; i++) {
      bodyEnv.put(0, i, paramTypes[i])
    }
    const bodyType = this.body.typeCheck(bodyEnv)
    bodyType.assertSubtypeOf(retType, typeEnv, this)
    return this.funcType
  }
})

module.exports = FuncStmntTypeChecker
