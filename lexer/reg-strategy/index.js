const NumReg = require('./token/number')
const StrReg = require('./token/string')
const IdReg = require('./token/identity')

const regexPat = `\\s*(?:(\/\/.*)|(${NumReg.source})|${StrReg.source}|(${IdReg.source}))?`

const createToken = (matcher) => {
  const token = {}
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
    // not comment
    return token
  }
}

const run = (line) => {
  const queue = []
  let pos = 0
  let endPos = line.length
  let Regexp = new RegExp(regexPat, 'g')

  while (pos < endPos) {
    const matcher = Regexp.exec(line)
    pos = Regexp.lastIndex
    if (matcher) {
      const token = createToken(matcher)
      token && queue.push(token)
    } else {
      throw new Error(`bad token at line: ${this.lineNo} near postion: ${pos}`)
    }
  }

  return queue
}

module.exports = run
