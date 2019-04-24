const basicAST = require('./basic')
const functionAST = require('./function')
const closureAST = require('./closure')
const classAST = require('./class')
const arrayAST =require('./array')

module.exports = Object.assign(
  {}, 
  basicAST, 
  functionAST, 
  closureAST, 
  classAST,
  arrayAST
)
