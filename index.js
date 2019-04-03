const fs = require('fs')
const path = require('path')

const ReadlineTransform = require('./utils/readline-transform')
// const LogPassthrough = require('./utils/log-passthrough')
const Lexer = require('./lexer')
const Parser = require('./parser')

// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-factor.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-operator.js'))
const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-expression.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example.js'))

SourceCode
  .pipe(new ReadlineTransform())
  .pipe(new Lexer())
  .pipe(new Parser())
  // .pipe(new LogPassthrough({objectMode: true}))
