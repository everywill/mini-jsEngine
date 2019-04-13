const basicAST = require('./basic')
const functionAST = require('./function')
const closureAST = require('./closure')
const classAST = require('./class')

module.exports = Object.assign(
  {}, 
  basicAST, 
  functionAST, 
  closureAST, 
  classAST
)
