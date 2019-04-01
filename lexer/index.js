const { Transform } = require('stream')
const runRegStrategy = require('./reg-strategy')

class Lexer extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      readableObjectMode: true
    }))
  }
  _transform(chunk, encoding, callback) {
    const line = chunk.toString().trim()
    // 词法分析
    const queue = runRegStrategy(line)
    callback(null, queue)
  }
}

module.exports = Lexer
