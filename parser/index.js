const { Transform } = require('stream')

const Parser = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const kwywordsInline = chunk
    // 语法分析
    callback()
  }
})

module.exports = Parser
