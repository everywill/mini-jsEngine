const fs = require('fs')
const path = require('path')

const ReadlineTransform = require('./utils/readline-transform')
const Lexer = require('./lexer')
const Parser = require('./parser')

const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example.js'))

SourceCode.pipe(new ReadlineTransform()).pipe(new Lexer()).pipe(new Parser())
