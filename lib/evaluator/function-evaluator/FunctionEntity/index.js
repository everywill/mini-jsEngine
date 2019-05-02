"use strict";

const hashcode = require('../../../utils/hashcode');

const {
  NestedEnv
} = require('../../environment');

class FunctionEntity {
  constructor(parameters, body, env) {
    this.parameterList = parameters;
    this.funcBody = body;
    this.env = env;
  }

  get parameters() {
    return this.parameterList;
  }

  get body() {
    return this.funcBody;
  }

  makeEnv() {
    return new NestedEnv(this.env);
  }

  toString() {
    return `<func: ${hashcode(JSON.stringify(this.body))}>`;
  }

}

module.exports = FunctionEntity;