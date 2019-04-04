const { Writable } = require('stream')
const Environment = require('./environment')

class Evaluator extends Writable {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))
  }
  _write(chunk, encoding, callback) {
    this.ast = chunk
    callback()
  }
  _final(callback) {
    let r = this.ast.eval()
    console.log(r)
    callback()
  }
}

module.exports = Evaluator
