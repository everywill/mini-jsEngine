const NumReg = require('./token/number')
const StrReg = require('./token/string')
const IdReg = require('./token/identifier')

const regexPat = `\\s*(?:(\/\/.*)|(${NumReg.source})|${StrReg.source}|(${IdReg.source}))?\\s*`

const createToken = (matcher, lineNo) => {
  const token = {}
  // console.log(matcher)
  if (matcher[2] !== undefined) {
    token.type = 'number'
    token.value = parseInt(matcher[2])
  } else if (matcher[3] !== undefined) {
    token.type = 'string'
    token.value = matcher[3]
  } else if (matcher[4] !== undefined){
    token.type = 'identifier'
    token.value = matcher[4]
  }
  if (matcher[1] === undefined) {
    // not comment
    token.lineNo = lineNo

    return token
  }
}

const run = (lineData) => {
  let { content, lineNo } = lineData

  const queue = []
  let pos = 0
  let endPos = content.length
  let Regexp = new RegExp(regexPat, 'g')

  while (pos < endPos) {
    const matcher = Regexp.exec(content)
    pos = Regexp.lastIndex
    if (matcher) {
      const token = createToken(matcher, lineNo)
      token && queue.push(token)
    } else {
      throw new Error(`bad token at line: ${this.lineNo} near postion: ${pos}`)
    }
  }

  return queue
}

module.exports = run
