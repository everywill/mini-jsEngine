const { Writable } = require('stream')
const { 
  BasicEnv,
  NestedEnv,
  ArraySymbolEnv,
  nativeFuncWrap,
} = require('./environment')

const envs = {
  basic: BasicEnv,
  func: NestedEnv,
  closure: NestedEnv,
  nativeFunc: NestedEnv,
  classDef: NestedEnv,
  array: NestedEnv,
  optClosure: ArraySymbolEnv,
}

class Evaluator extends Writable {
  constructor(options) {
    const { evaluator: evaluatorName, ...rest } = options
    super(Object.assign({}, rest, {
      objectMode: true,
    }))

    let envClazz = nativeFuncWrap(envs[evaluatorName])

    this.env = new envClazz()
    this.env.appendNatives()
  }
  _write(chunk, encoding, callback) {
    const {astList} = chunk
    this.astList = astList
    callback()
  }
  _final(callback) {
    let r
    this.astList.map((ast) => {
      // console.log(ast)
      r = ast.eval(this.env)
      // eslint-disable-next-line
      console.log(`eval result: ${r}`)
    })
  
    callback()
  }
}

module.exports = Evaluator
