const { Transform } = require('stream')
const { 
  BasicEnv,
  NestedEnv,
  ArraySymbolEnv,
  nativeFuncWrap,
} = require('../evaluator/environment')

const envs = {
  basic: BasicEnv,
  func: NestedEnv,
  closure: NestedEnv,
  nativeFunc: NestedEnv,
  classDef: NestedEnv,
  array: NestedEnv,
  optClosure: ArraySymbolEnv,
}

class Optimizer extends Transform {
  constructor(options) {
    const { optimizer: optimizerName, ...rest } = options
    super(Object.assign({}, rest, {
      objectMode: true,
    }))
    let envClazz = nativeFuncWrap(envs[optimizerName])
    let env = new envClazz()
    env.appendNatives()
    this.symbols = env.names
  }
  _transform(chunk, encoding, callback) {
    const {astList} = chunk
    this.astList = astList
    callback()
  }
  _final(callback) {
    this.astList.map((ast) => {
      // console.log(ast)
      ast.lookup(this.symbols)
      // eslint-disable-next-line
      // console.log(`eval result: ${r}`)
    })
    // console.log(this.astList)
    this.push({
      astList: this.astList,
    })
    callback()
  }
}

module.exports = Optimizer
