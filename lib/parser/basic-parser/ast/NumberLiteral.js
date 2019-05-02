"use strict";

var _class;

const ASTLeaf = require('../../ast-root/ASTLeaf');

const NumberLiteralEval = require('../../../evaluator/basic-evaluator/ast-eval/NumberLiteral');

let NumberLiteral = NumberLiteralEval(_class = class NumberLiteral extends ASTLeaf {
  constructor(token) {
    super(token);
  }

  get value() {
    return parseFloat(this.token.value);
  }

}) || _class;

module.exports = NumberLiteral;