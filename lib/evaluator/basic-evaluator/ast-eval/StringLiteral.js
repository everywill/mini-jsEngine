"use strict";

const mixin = require('../../../utils/decorator-mixin');

const StringLiteralEval = mixin({
  eval() {
    return this.value;
  }

});
module.exports = StringLiteralEval;