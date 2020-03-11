const FunctionType = require('./FunctionType')
const UnknownType = require('./UnknownType')
const { TypeTag }= require('../../parser/typed-parser/ast')

class TypeInfo {
  static getTypeInfo(typeTag) {
    const typeName = typeTag.type 
    if (typeName === TypeInfo.INT.toString()) {
      return TypeInfo.INT
    } else if (typeName === TypeInfo.STRING.toString()) {
      return TypeInfo.STRING
    } else if (typeName === TypeInfo.ANY.toString()) {
      return TypeInfo.ANY
    } else if (typeName === TypeTag.UNDEF) {
      return new UnknownType()
    }
    throw new Error(`unknown type ${typeName}`)
  }
  
  match(typeInfo) {
    return this === typeInfo
  }
  subtypeOf(superTypeInfo) {
    return this === superTypeInfo || superTypeInfo === TypeInfo.ANY
  }
  assertSubtypeOf(typeInfo, typeEnv, ASTree) {
    if (!this.subtypeOf(typeInfo)) {
      throw new Error(`type mismatch: cannot convert from ${this} to ${typeInfo}, ${ASTree}`)
    }
  }
  plus(rightTypeInfo, typeEnv) {
    if (TypeInfo.INT.match(this) && TypeInfo.INT.match(rightTypeInfo)) {
      return TypeInfo.INT
    } else if (TypeInfo.STRING.match(this) || TypeInfo.STRING.match(rightTypeInfo)) {
      return TypeInfo.STRING
    } else {
      return TypeInfo.ANY
    }
  }
  union(rightTypeInfo, typeEnv) {
    if (this.match(rightTypeInfo)) {
      return this
    }
    return TypeInfo.ANY
  }
  functionType(retTypeInfo, paramsTypeInfo) {
    return new FunctionType(retTypeInfo, paramsTypeInfo)
  }
  isFunctionType() {
    return false
  }
  toFunctionType() {
    return null
  }
}

const anyType = new TypeInfo()
anyType.toString = function() {
  return 'Any'
}
TypeInfo.ANY = anyType

const intType = new TypeInfo()
intType.toString = function() {
  return 'Int'
}
TypeInfo.INT = intType

const stringType = new TypeInfo()
stringType.toString = function() {
  return 'String'
}
TypeInfo.STRING = stringType

module.exports = TypeInfo
