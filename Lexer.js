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
    let Regexp = new RegExp(regexPat, 'g')
    while (pos < endPos) {
      const matcher = Regexp.exec(line)
      pos = Regexp.lastIndex
      if (matcher) {
        this.addToken(this.lineNo, matcher)
      } else {
        throw new Error(`bad token at line: ${this.lineNo} near postion: ${pos}`)
      }
    }
    console.log('Token queue: ', this.queue)
  }
  addToken(lineNo, matcher) {
    const token = { lineNo }
    // console.log(matcher)
    if (matcher[2] !== undefined) {
      token.type = 'number'
      token.value = parseInt(matcher[2])
    } else if (matcher[3] !== undefined) {
      token.type = 'string'
      token.value = matcher[3]
    } else if (matcher[4] !== undefined){
      token.type = 'identity'
      token.value = matcher[4]
    }
    if (matcher[1] === undefined) {
      this.queue.push(token)
    }
  }
  getToken(index) {
    return this.queue[index]
  }
  read() {
    this.reader.on('line', this.lineNumberReader.bind(this))
  }
}



module.exports = Lexer
