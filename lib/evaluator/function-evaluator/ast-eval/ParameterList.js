"use strict";

const mixin = require('../../../utils/decorator-mixin');

const ParameterListEval = mixin({
  eval(env, index, value) {
    env.putNew(this.name(index), value);
  }

});
module.exports = ParameterListEval;