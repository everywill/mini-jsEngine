const { Transform }  = require('stream')

const splitting_re = /.*?(?:\r\n|\r|\n)|.*?$/g

class ReadlineTransform extends Transform {
  constructor(options) {
    super(options)
    this.lineBuffer = ''
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      if (!encoding || encoding == 'buffer') {
        encoding = 'utf8'
      }
      chunk = chunk.toString(encoding)
    }

    this.lineBuffer += chunk
    const lines = this.lineBuffer.match(splitting_re)

    while(lines.length > 1) {
      this.push(lines.shift())
    }

    this.lineBuffer = lines[0] || ''

    callback()
  }

  _flush(callback) {
    if (this.lineBuffer) {
      this.push(this.lineBuffer)
      this.lineBuffer = ''
    }

    callback()
  }
}

module.exports = ReadlineTransform
