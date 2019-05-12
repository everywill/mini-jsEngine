const fs = require('fs')
const path = require('path')

const ReadlineTransform = require('./lib/utils/readline-transform')
const LogPassthrough = require('./lib/utils/log-passthrough')
const Lexer = require('./lib/lexer')
const Parser = require('./lib/parser')
const Optimizer = require('./lib/optimizer')
const Evaluator = require('./lib/evaluator')

// basic func closure nativeFunc classDef array optClosure optClass
let type = 'optClass'

const lexer = new Lexer()
const parser = new Parser({parser: type})
const optimizer = new Optimizer({optimizer: type})
const evaluator = new Evaluator({evaluator: type})

// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-factor.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-operator.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-expression.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-func.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-now.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-closure.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-native-func.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-class.js'))
const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-class-opt.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example-array.js'))
// const SourceCode = fs.createReadStream(path.join(__dirname, '__test__/example.js'))

SourceCode
  .pipe(new ReadlineTransform())
  .pipe(lexer)
  .pipe(parser)
  .pipe(optimizer)
  .pipe(evaluator)
  // .pipe(new LogPassthrough({objectMode: true}))
