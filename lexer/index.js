const { Transform } = require('stream')
const runRegStrategy = require('./reg-strategy')

class Lexer extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true
    }))
  }
  _transform(chunk, encoding, callback) {
    const lineData = chunk
    // 词法分析
    const queue = runRegStrategy(lineData)
    callback(null, queue)
  }
}

module.exports = Lexer
