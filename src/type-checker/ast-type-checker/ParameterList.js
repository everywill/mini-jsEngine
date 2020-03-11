const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const ParameterListTypeChecker = mixin({
  types() {
    const size = this.size
    const result = []
    for (let i = 0; i < size; i++) {
      result[i] = TypeInfo.getTypeInfo(this.typeTag(i))
    }
    return result
  }
})

module.exports = ParameterListTypeChecker
