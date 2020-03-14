const TypeInfo = require('./TypeInfo')

class UnknownType extends TypeInfo {
  constructor() {
    super()
    this.typeInfo = null
  }
  get resolved() {
    return this.typeInfo !== null
  }
  setType(typeInfo) {
    this.typeInfo = typeInfo
  }
  type() {
    return this.typeInfo ? this.typeInfo : TypeInfo.ANY
  }
  isUnknownType() {
    return true
  }
  assertSupertypeOf(typeInfo, typeEnv, ASTree) {
    if (this.resolved) {
      typeInfo.assertSubtypeOf(this.typeInfo, typeEnv, ASTree)
    } else {
      typeEnv.addEquation(this, typeInfo)
    }
  }
  union(rightType, typeEnv) {
    if (this.resolved) {
      return this.type.union(rightType, typeEnv)
    } else {
      typeEnv.addEquation(this, rightType)
    }
  }
  plus(rightType, typeEnv) {
    if (this.resolved) {
      return this.type.plus(rightType, typeEnv)
    } else {
      typeEnv.addEquation(this, TypeInfo.INT)
      return rightType.plus(TypeInfo.INT, typeEnv)
    }
  }
  toString() {
    return this.type().toString()
  }
}

module.exports = UnknownType
