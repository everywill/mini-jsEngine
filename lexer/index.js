const { Transform } = require('stream')
const runRegStrategy = require('./reg-strategy')

const Lexer = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    const line = chunk.toString().trim()
    // 词法分析
    const queue = runRegStrategy(line)
    this.push(queue)
    callback()
  }
})

module.exports = Lexer
