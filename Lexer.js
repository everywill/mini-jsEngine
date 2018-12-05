const NumReg = require('./Token/number')
const StrReg = require('./Token/string')
const IdReg = require('./Token/identity')

const regexPat = `\\s*(?:(\/\/.*)|(${NumReg.source})|${StrReg.source}|(${IdReg.source}))?`

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
    console.log('endPos: ', endPos)
    let Regexp = new RegExp(regexPat, 'g')
    while (pos < endPos) {
      const matcher = Regexp.exec(line)
      pos = Regexp.lastIndex
      if (matcher) {
        console.log('pos: ', pos)
        console.log('endPos: ', endPos)
        this.addToken(this.lineNo, matcher)
      } else {
        throw new Error(`bad token at line: ${this.lineNo} near postion: ${pos}`)
      }
    }
  }
  
  addToken(lineNo, matcher) {
    console.log(matcher)
    this.queue.push({
      lineNo,
      // value:
      // type: 
    })
  }
  read() {
    this.reader.on('line', this.lineNumberReader.bind(this))
  }
}



module.exports = Lexer
