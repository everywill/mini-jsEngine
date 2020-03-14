const TypeInfo = require('./TypeInfo')

class UnknownType extends TypeInfo {
  isUnknownType() {
    return true
  }
  type() {
    return TypeInfo.ANY
  }
  toString() {
    return this.type().toString()
  }
}

module.exports = UnknownType
