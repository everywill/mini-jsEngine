const { Transform }  = require('stream')

const splitting_re = /.*?(?:\r\n|\r|\n)|.*?$/g

class ReadlineTransform extends Transform {
  constructor(options) {
    super(Object.assign({}, options, {
      readableObjectMode: true,
    }))
    this.lineBuffer = ''
    this.lineNo = 0
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
      let content = lines.shift()
      this.lineNo ++
      
      if (['\r\n', '\r', '\n'].indexOf(content) === -1) {
        // console.log(`content: ${content}`)
        this.push({
          content,
          lineNo: this.lineNo,
        })
      }
    }

    this.lineBuffer = lines[0] || ''

    callback()
  }

  _flush(callback) {
    if (this.lineBuffer) {
      this.push({
        content: this.lineBuffer,
        lineNo: ++this.lineNo,
      })
      this.lineBuffer = ''
    }

    callback()
  }
}

module.exports = ReadlineTransform
