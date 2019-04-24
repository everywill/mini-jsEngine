const { Transform } = require('stream')
const llStrategy = require('./ll-strategy')

class Parser extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.parserStrategy = llStrategy
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
    this.push(result)
    callback()
  }
}

module.exports = Parser
