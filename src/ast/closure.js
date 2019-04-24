const { ASTList } = require('./root-type')
const { FunctionEntity } = require('./function')

class Closure extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get parameters() {
    return this.child(0)
  }
  get body() {
    return this.child(1)
  }
  toString() {
    return `(closure ${this.parameters} ${this.body})`
  }
  eval(env) {
    return new FunctionEntity(this.parameters, this.body, env)
  }
}

module.exports = {
  Closure,
}
