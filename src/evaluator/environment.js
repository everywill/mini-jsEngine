const { NativeFunction } = require('../ast/native-func')
const { Symbols } = require('../optimizer/symbols')

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

// add: 闭包
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

// add: 增加对原生函数的支持
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

// add: 优化变量读写性能
class ArrayEnv extends EnvWithNatives {
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

module.exports = {
  BasicEnv,
  NestedEnv,
  EnvWithNatives,
  ArrayEnv,
  ArraySymbolEnv,
}
