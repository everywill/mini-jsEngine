const mixin = require('../../../utils/decorator-mixin')

const ClassStmntLookup = mixin({
  // 延迟到eval时
  lookup(symbols) {},
})

module.exports = ClassStmntLookup
