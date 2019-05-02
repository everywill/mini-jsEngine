"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const FuncStmntEval = require('../../../evaluator/function-evaluator/ast-eval/FuncStmnt');

let FuncStmnt = FuncStmntEval(_class = class FuncStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get name() {
    return this.child(0).name;
  }

  get parameters() {
    return this.child(1);
  }

  get body() {
    return this.child(2);
  }

  toString() {
    return `(func ${this.name} ${this.parameters} ${this.body})`;
  }

}) || _class;

module.exports = FuncStmnt;