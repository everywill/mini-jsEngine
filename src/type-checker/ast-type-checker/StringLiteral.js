const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const StringLiteralTypeChecker = mixin({
  typeCheck(typeEnv) {
    return TypeInfo.STRING
  }
})

module.exports = StringLiteralTypeChecker
