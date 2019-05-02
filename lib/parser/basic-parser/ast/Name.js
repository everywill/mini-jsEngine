"use strict";

var _class;

const ASTLeaf = require('../../ast-root/ASTLeaf');

const NameEval = require('../../../evaluator/basic-evaluator/ast-eval/Name');

let Name = NameEval(_class = class Name extends ASTLeaf {
  constructor(token) {
    super(token);
  }

  get name() {
    return this.token.value;
  }

}) || _class; // console.log(typeof Name)


module.exports = Name;