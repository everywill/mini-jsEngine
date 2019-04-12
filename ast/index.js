const basicAST = require('./basic')
const functionAST = require('./function')
const closureAST = require('./closure')

module.exports = Object.assign({}, basicAST, functionAST, closureAST)
