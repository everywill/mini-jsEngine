"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const IfStmntEval = require('../../../evaluator/basic-evaluator/ast-eval/IfStmnt');

let IfStmnt = IfStmntEval(_class = class IfStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get condition() {
    return this.child(0);
  }

  get thenBlock() {
    return this.child(1);
  }

  get elseBlock() {
    return this.numChildren > 2 ? this.child(2) : null;
  }

  toString() {
    return `(if ${this.condition} ${this.thenBlock} else ${this.elseBlock})`;
  }

}) || _class;

module.exports = IfStmnt;