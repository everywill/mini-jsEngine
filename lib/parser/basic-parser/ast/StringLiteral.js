"use strict";

var _class;

const ASTLeaf = require('../../ast-root/ASTLeaf');

const StringLiteralEval = require('../../../evaluator/basic-evaluator/ast-eval/StringLiteral');

let StringLiteral = StringLiteralEval(_class = class StringLiteral extends ASTLeaf {
  constructor(token) {
    super(token);
  }

  get value() {
    return this.token.value;
  }

  eval() {
    return this.value;
  }

}) || _class;

module.exports = StringLiteral;