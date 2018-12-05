const fs = require('fs')
const path = require('path')

const Lexer = require('./Lexer')

const lineReader = require('readline').createInterface({
  input: fs.createReadStream(path.join(__dirname, '__test__/example.js'))
})

const lexer = new Lexer(lineReader)
lexer.read()