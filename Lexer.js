const NumReg = require('./Token/number')
const StrReg = require('./Token/string')
const IdReg = require('./Token/identity')

class Lexer {
  constructor(reader) {
    this.hasMore = true
    this.lineNo = 0
    this.queue = []
    this.reader = reader
  }
  lineNumberReader(line) {
    this.lineNo = this.lineNo + 1
    console.log(`Line ${this.lineNo}: `, line)

    let pos = 0
    let endPos = line.length
    while (pos < endPos) {
      addToken
    }
  }
  
  addToken(lineNo, matcher) {
    this.queue.push({
      lineNo,
      value:
      type: 
    })
  }
  read() {
    this.reader.on('line', this.lineNumberReader.bind(this))
  }
}

Lexer.regexPat = new RegExp(`\\s*((\/\/.*)|(${NumReg.source})|(${StrReg.source})|(${IdReg.source}))?`)

module.exports = Lexer
