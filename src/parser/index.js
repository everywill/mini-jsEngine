const { Transform } = require('stream')
const functionParser = require('./function-parser')

class Parser extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.parserStrategy = new functionParser()
  }

  _transform(chunk, encoding, callback) {
    const words = chunk;
    // console.log('Writable write')
    // console.log(words)
    words.map((word) => {
      this.parserStrategy.run(word)
    })
    callback()
  }

  _final(callback) {
    // console.log('Writable final')
    const result = this.parserStrategy.end()
    this.push({astList: result})
    callback()
  }
}

module.exports = Parser
