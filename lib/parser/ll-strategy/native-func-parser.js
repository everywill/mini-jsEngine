"use strict";

const ClosureParser = require('./closure-parser');

class NativeFuncParser extends ClosureParser {
  constructor(options) {
    super(options);
  }

}

module.exports = NativeFuncParser;