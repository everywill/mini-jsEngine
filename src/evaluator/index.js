const { Writable } = require('stream')
const { 
  NestedEnv,
} = require('./environment')

class Evaluator extends Writable {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.env = new NestedEnv()
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
