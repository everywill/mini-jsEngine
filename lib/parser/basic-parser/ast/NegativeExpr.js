"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const NegativeExprEval = require('../../../evaluator/basic-evaluator/ast-eval/NegativeExpr');

let NegativeExpr = NegativeExprEval(_class = class NegativeExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get operand() {
    return this.child(1);
  }

  toString() {
    return `-${this.operand}`;
  }

}) || _class;

module.exports = NegativeExpr;