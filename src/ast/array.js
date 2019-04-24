const { ASTList } = require('./root-type')

class ArrayLiteral extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
  eval(env) {
    let res = []
    let i = 0
    for (let element of this) {
      res[i++] = element.eval(env)
    }
    return res
  }
}

class ArrayRef extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get index() {
    return this.child(0)
  }
  toString() {
    return `[${this.index}]`
  }
  eval(env, target) {
    if (Array.isArray(target)) {
      let index = this.index.eval(env)

      if (typeof index === 'number' && Math.floor(index) === index) {
        // 确认为整数类型
        return target[index]
      }
      throw new Error(`bad array index: ${index}`)
    }
  }
}

module.exports = {
  ArrayLiteral,
  ArrayRef,
}
