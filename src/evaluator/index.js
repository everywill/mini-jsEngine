const { Writable } = require('stream')
const { 
  BasicEnv,
  NestedEnv,
  NativeFuncEnv,
  // ArrayEnv,
  // ArraySymbolEnv,
} = require('./environment')

const envs = {
  basic: BasicEnv,
  func: NestedEnv,
  closure: NestedEnv,
  nativeFunc: NativeFuncEnv,
  classDef: NativeFuncEnv || NestedEnv
}

class Evaluator extends Writable {
  constructor(options) {
    const { evaluator: evaluatorName, ...rest } = options
    super(Object.assign({}, rest, {
      objectMode: true,
    }))

    this.env = new envs[evaluatorName]()
  }
  _write(chunk, encoding, callback) {
    this.astList = chunk
    callback()
  }
  _final(callback) {
    let r
    this.astList.map((ast) => {
      r = ast.eval(this.env)
      // eslint-disable-next-line
      console.log(`eval result: ${r}`)
    })
  
    callback()
  }
}

module.exports = Evaluator
