const TypeInfo = require('./TypeInfo')

class UnknownType extends TypeInfo {
  isUnknownType() {
    return true
  }
}

module.exports = UnknownType
