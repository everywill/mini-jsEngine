"use strict";

var _class;

const ASTList = require('../../ast-root/ASTList');

const BlockStmntEval = require('../../../evaluator/basic-evaluator/ast-eval/BlockStmnt');

let BlockStmnt = BlockStmntEval(_class = class BlockStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

}) || _class;

module.exports = BlockStmnt;