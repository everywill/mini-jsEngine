const { Transform } = require('stream')
const basicParser = require('./basic-parser')
const functionParser = require('./function-parser')
const closureParser = require('./closure-parser')

const parsers = {
  basic: basicParser,
  func: functionParser,
  closure: closureParser,
  nativeFunc: closureParser || functionParser,
}

class Parser extends Transform {
  constructor(options) {
    const { parser: parserName, ...rest } = options
    super(Object.assign({}, rest, {
      objectMode: true,
    }))

    this.parserStrategy = new parsers[parserName]()
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
