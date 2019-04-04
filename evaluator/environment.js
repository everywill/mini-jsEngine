class Environment {
  constructor() {
    this.values = {}
  }
  put(key, value) {
    this.values[key] = value
  }
  get(key) {
    return this.valuess[key]
  }
}

module.exports = Environment
