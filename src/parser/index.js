const { Transform } = require('stream')
const basicParser = require('./basic-parser')
const functionParser = require('./function-parser')
const closureParser = require('./closure-parser')
const ClassParser = require('./class-parser')
const ArrayParser = require('./array-parser')

const parsers = {
  basic: basicParser,
  func: functionParser,
  closure: closureParser,
  nativeFunc: closureParser || functionParser,
  classDef: ClassParser,
  array: ArrayParser,
  optClosure: closureParser,
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
    this.push({astList: result})
    callback()
  }
}

module.exports = Parser
