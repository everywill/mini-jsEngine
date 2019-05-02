"use strict";

const {
  Transform
} = require('stream');

class LogPassThrough extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    // eslint-disable-next-line
    console.log(chunk);
    callback(null, chunk);
  }

}

module.exports = LogPassThrough;