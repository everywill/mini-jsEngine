const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const FuncStmntTypeChecker = mixin({
  typeCheck(typeEnv) {}
})

module.exports = FuncStmntTypeChecker
