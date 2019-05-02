"use strict";

const mixin = require('../../../utils/decorator-mixin');

const NegativeExprEval = mixin({
  eval(env) {
    let v = this.operand.eval(env);

    if (typeof v === 'number') {
      return -v;
    } else {
      throw 'bad type for -';
    }
  }

});
module.exports = NegativeExprEval;