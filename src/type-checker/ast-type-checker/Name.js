const mixin = require('../../utils/decorator-mixin')

const NameTypeChecker = mixin({
  typeCheck(typeEnv) {
    const type = typeEnv.get(this.nestHierarchy, this.index)
    if (!type) {
      throw new Error(`undefined name: ${this.name}`)
    } else {
      return type
    }
  },
  typeCheckForAssign(typeEnv, rType) {
    let type = typeEnv.get(this.nestHierarchy, this.index)
    if (!type) {
      type = rType
      // 最内层env添加次Name对应type
      typeEnv.put(0, this.index, rType)
    } else {
      rType.assertSubtypeOf(type, typeEnv, this)
      return type
    }
  }
})

module.exports = NameTypeChecker
