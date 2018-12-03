const fs = require('fs')
const path = require('path')

const NumberReg = require('./Token/number')
const StringReg = require('./Token/string')
const IdentityReg = require('./Token/identity')

const regexPat = new RegExp(`\\s*((\/\/.*)|(${NumberReg.source})|(${StringReg.source})|(${IdentityReg.source}))?`)

let hasMore = true

const lineReader = require('readline').createInterface({
  input: fs.createReadStream(path.join(__dirname, '__test__/example.js'))
})

lineReader.on('line', function(line) {
  console.log('Line from file:', regexPat.exec(line))
})