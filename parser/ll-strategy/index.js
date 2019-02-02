const { Transform } = require('stream')

class Precedence {
  constructor(value, isLeftAssoc) {
    this.value = value
    this.isLeftAssoc = isLeftAssoc
  } 
}

const operators = {
  '<': new Precedence(1, true),
  '>': new Precedence(1, true),
  '+': new Precedence(2, true),
  '-': new Precedence(2, true),
  '*': new Precedence(3, true),
  '/': new Precedence(3, true),
  '^': new Precedence(4, false),
}

const expression = () => {}

const doShift = () => {}

const rightIsExpr = () => {}

function createParser(options, state) { 
  function emitLine() {}
  function queue() {}
  function reset() {}

  return new Transform({
    
  })
}

module.exports = cb => {
  const state = {

  }

  const options = {
    cb,
  }

  return createParser(options, state).on('error', (err) => {
    if (cb) {
      cb(err)
    }
  })
}


