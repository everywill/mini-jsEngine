const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const NumberLiteralTypeChecker = mixin({
  typeCheck(typeEnv) {
    return TypeInfo.INT
  }
})

module.exports = NumberLiteralTypeChecker
