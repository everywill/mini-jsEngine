const TypeInfo = require('./TypeInfo')

class FunctionType extends TypeInfo {
  constructor(retTypeInfo, paramsTypeInfo) {
    super()
    this.returnType = retTypeInfo
    this.parameterTypes = paramsTypeInfo
  }
  isFunctionType() {
    return true
  }
  toFunctionType() {
    return this
  }
  match(typeInfo) {
    if(typeInfo instanceof FunctionType === false) {
      return false
    }
    if (this.parameterTypes.length !== typeInfo.parameterTypes.length) {
      return false
    }
    for (let i = 0; i < this.parameterTypes.length; i++) {
      if (this.parameterTypes[i].match(typeInfo.parameterTypes[i]) === false) {
        return false
      }
    }
    return this.returnType.match(typeInfo.returnType)
  }
  toString() {
    let result = ''
    if (this.parameterTypes.length) {
      for (let i = 0; i < this.parameterTypes.length; i++) {
        if (i > 0) {
          result = `${result} * `
        }
        result = `${result}${this.parameterTypes[i]}`
      }
    } else {
      result = 'Unit'
    }
    return `${result} => ${this.returnType}`
  }
}

module.exports = FunctionType
