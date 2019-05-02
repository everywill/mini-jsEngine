"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const ArgumentsEval = require('../../../evaluator/function-evaluator/ast-eval/Arguments');

let Arguments = ArgumentsEval(_class = class Arguments extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get size() {
    return this.numChildren;
  }

}) || _class;

module.exports = Arguments;