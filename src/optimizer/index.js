const { Transform } = require('stream')
const Symbols = require('./Symbols')

class Optimizer extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))
    this.symbols = new Symbols()
  }
  _transform(chunk, encoding, callback) {
    this.astList = chunk
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
    this.push(this.astList)
    callback()
  }
}

module.exports = Optimizer
