class TypeInfo {
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
