const mixin = require('../../utils/decorator-mixin')
const { TypeInfo } = require('../type-info')

const BlockStmntTypeChecker = mixin({
  typeCheck(typeEnv) {
    let type = TypeInfo.INT
    for (let child of this) {
      type = child.typeCheck(typeEnv)
    }
    return type
  }
})

module.exports = BlockStmntTypeChecker
