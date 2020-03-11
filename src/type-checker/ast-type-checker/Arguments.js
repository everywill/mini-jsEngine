const mixin = require('../../utils/decorator-mixin')
const { FunctionType } = require('../type-info')

const ArgumentsTypeChecker = mixin({
  typeCheck(typeEnv, targetType) {
    if (targetType instanceof FunctionType === false) {
      throw new Error('bad function')
    }
    const paramTypes = targetType.parameterTypes
    if (this.size !== paramTypes.length) {
      throw new Error('bad number of arguments')
    }
    let num = 0
    for (let arg of this) {
      const argType = arg.typeCheck(typeEnv)
      argType.assertSubtypeOf(paramTypes[num++], typeEnv, this)
    }

    return targetType.returnType
  }
})

module.expxorts = ArgumentsTypeChecker
