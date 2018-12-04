const fs = require('fs')
const path = require('path')

const NumReg = require('./Token/number')
const StrReg = require('./Token/string')
const IdReg = require('./Token/identity')

let hasMore = true


const lineReader = require('readline').createInterface({
  input: fs.createReadStream(path.join(__dirname, '__test__/example.js'))
})
/*
lineReader.on('line', function(line) {
  console.log('Line from file:', regexPat.exec(line))
})
*/

class Lexer {
  constructor(reader) {
    this.hasMore = true
    reader.on('line', this.lineNumberReader)
  }
  lineNumberReader(line) {
    console.log('Line from file:', line)
  }
}

Lexer.regexPat = new RegExp(`\\s*((\/\/.*)|(${NumReg.source})|(${StrReg.source})|(${IdReg.source}))?`)

new Lexer(lineReader)
