"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const WhileStmntEval = require('../../../evaluator/basic-evaluator/ast-eval/WhileStmnt');

let WhileStmnt = WhileStmntEval(_class = class WhileStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get condition() {
    return this.child(0);
  }

  get body() {
    return this.child(1);
  }

  toString() {
    return `(while ${this.condition} ${this.body})`;
  }

}) || _class;

module.exports = WhileStmnt;