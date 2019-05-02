"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const PrimaryExprEval = require('../../../evaluator/function-evaluator/ast-eval/PrimaryExpr');

let PrimaryExpr = PrimaryExprEval(_class = class PrimaryExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get operand() {
    return this.child(0);
  }

  postfix(nestHierarchy) {
    return this.child(this.numChildren - nestHierarchy - 1);
  }

  hasPostfix(nestHierarchy) {
    return this.numChildren - nestHierarchy - 1 > 0;
  }

}) || _class;

module.exports = PrimaryExpr;