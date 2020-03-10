const ASTList = require('../../ast-root/ASTList')
const BlockStmntEval = require('../../../evaluator/basic-evaluator/ast-eval/BlockStmnt')

@BlockStmntEval
class BlockStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

module.exports = BlockStmnt
