"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const ParameterListEval = require('../../../evaluator/function-evaluator/ast-eval/ParameterList');

let ParameterList = ParameterListEval(_class = class ParameterList extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get size() {
    return this.numChildren;
  }

  name(i) {
    return this.child(i).name;
  }

}) || _class;

module.exports = ParameterList;