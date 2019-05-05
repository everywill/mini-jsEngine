const ArrayEnv = require('./ArrayEnv')
const { Symbols } = require('../../optimizer/Symbols')

class ArraySymbolEnv extends ArrayEnv {
  constructor(env) {
    super(env)
    this.names = new Symbols()
  }
  get(...args) {
    if (args.length === 2) {
      // args = [nestHierarchy, index]
      return super.get(...args)
    }
    // args = [name]
    let name = args[0]
    let index = this.names.find(name)
    if (index === -1) {
      if (this.outer) {
        return this.outer.get(name)
      }
      return null
    }
    return this.values[index]
  }
  put(...args) {
    if (args.length === 3) {
      // args = [nestHierarchy, index, value]
      super.put(...args)
    } else {
      let [name, value] = args
      let e = this.where(name)
      if (!e) {
        e = this
      }
      e.putNew(name, value)
    }
  }
  putNew(name, value) {
    let index = this.names.putNew(name)
    this.values[index] = value
  }
  where(name) {
    let index = this.names.find(name)
    if (index !== -1) {
      return this
    } else if (this.outer) {
      return this.outer.where(name)
    }
    return null
  }
}

module.exports = ArraySymbolEnv
