const basicAST = require('./basic')
const functionAST = require('./function')

module.exports = Object.assign({}, basicAST, functionAST)
