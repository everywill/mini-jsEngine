const NestedEnv = require('./NestedEnv')

class ArrayEnv extends NestedEnv {
  constructor(env) {
    super(env)
    this.values = []
  }
  get(nestHierarchy, index) {
    if (nestHierarchy === 0) {
      return this.values[index]
    } else if (!this.outer) {
      return null
    } else {
      return this.outer.get(nestHierarchy - 1, index)
    }
  }
  put(nestHierarchy, index, value) {
    if (nestHierarchy === 0) {
      this.values[index] = value
    } else if (!this.outer) {
      throw new Error(`no outer environment`)
    } else {
      this.outer.put(nestHierarchy - 1, index, value)
    }
  }
  putNew(name, value) {
    this.error(name)
  }
  where(name) {
    this.error(name)
  }
  error(name) {
    throw new Error(`cannot access by name: ${name} in ArrayEnv`)
  }
}

module.exports = ArrayEnv
