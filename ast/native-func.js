// const { ASTList } = require('./root-type')
// const { FunctionEntity } = require('./function')

class NativeFunction {
  constructor(name, method) {
    this.name = name
    this.method = method
  }
  invoke(args = [], argsObj) {
    try {
      return this.method.apply(null, args)
    } catch (e) {
      throw new Error(`bad native function call: ${this.name} with args ${argsObj.toString()}`)
    }
  }
}

module.exports = {
  NativeFunction,
}
