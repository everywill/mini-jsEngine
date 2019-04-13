const { NativeFunction } = require('../ast/native-func')

class BasicEnv {
  constructor() {
    this.values = {}
  }
  put(key, value) {
    this.values[key] = value
  }
  get(key) {
    return this.values[key]
  }
}

class NestedEnv extends BasicEnv {
  constructor(env) {
    super()
    this.outer = env
  }
  setOuter(env) {
    this.outer = env
  }
  put(key, value) {
    let e = this.where(key)
    if (!e) {
      e = this
    }
    e.putNew(key, value)
  }
  putNew(key, value) {
    this.values[key] = value
  }
  // 寻找在哪个环境中
  where(key) {
    if (this.values[key] !== undefined) {
      return this
    } else if (this.outer) {
      return this.outer.where(key)
    } else {
      return null
    }
  }
  get(key) {
    let v = this.values[key]
    if (v === undefined && this.outer) {
      return this.outer.get(key)
    } else {
      return v
    }
  }
}

class EnvWithNatives extends NestedEnv {
  constructor(env) {
    super(env)
    this.appendNatives(this)
  }
  appendNatives(env) {
    // eslint-disable-next-line
    this.append(env, 'log', console.log)
  }
  append(env, name, method) {
    env.put(name, new NativeFunction(name, method))
  }
}

module.exports = {
  BasicEnv,
  NestedEnv,
  EnvWithNatives,
}
