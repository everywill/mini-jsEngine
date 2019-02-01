const { Transform } = require('stream')
const fs = require('fs')
const path = require('path')

const Lexer = require('./lexer')

const lineReader = require('readline').createInterface({
  input: fs.createReadStream(path.join(__dirname, '__test__/example.js')),
})

// 手动写入stream
lineReader.on('line', (line) => {
  Lexer.write(line)
})

// for test
const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n')
    callback()
  }
})

Lexer.pipe(objectToString).pipe(process.stdout)
