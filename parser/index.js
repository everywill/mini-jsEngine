const { Writable } = require('stream')
const llStrategy = require('./ll-strategy')

class Parser extends Writable {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.parserStrategy = llStrategy
  }

  _write(chunk, encoding, callback) {
    console.log('Writable write')
    const words = chunk;
    console.log(words)
    words.map((word) => {
      this.parserStrategy.run(word)
    })
    callback()
  }

  _final(callback) {
    console.log('Writable final')
    this.parserStrategy.end()
    callback()
  }
}

module.exports = Parser
