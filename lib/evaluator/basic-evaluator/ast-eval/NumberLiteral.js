"use strict";

const mixin = require('../../../utils/decorator-mixin');

const NumberLiteralEval = mixin({
  eval() {
    return this.value;
  }

});
module.exports = NumberLiteralEval;