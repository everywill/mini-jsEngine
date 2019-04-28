const { Transform } = require('stream')
const arrayEnvStrategy = require('./array-env')

class Parser extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.optimizeStrategy = arrayEnvStrategy
  }

  _transform(chunk, encoding, callback) {
    const astList = chunk
    // console.log('Writable write')
    // console.log(words)
    const optimalAST = astList.map((AST) => {
      this.parserStrategy.run(AST)
    })
    callback(optimalAST)
  }

  _final(callback) {
    callback()
  }
}

module.exports = Parser
