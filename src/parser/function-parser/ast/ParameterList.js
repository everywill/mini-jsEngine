const ASTList = require('../../ast/ASTList')

class ParameterList extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
  name(i) {
    return this.child(i).name
  }
  eval(env, index, value) {
    env.putNew(this.name(index), value)
  }
}

module.exports = ParameterList
