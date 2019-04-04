const { Writable } = require('stream')
const Environment = require('./environment')

class Evaluator extends Writable {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.env = new Environment
  }
  _write(chunk, encoding, callback) {
    this.ast = chunk
    callback()
  }
  _final(callback) {
    let r = this.ast.eval(this.env)
    console.log(r)
    callback()
  }
}

module.exports = Evaluator
