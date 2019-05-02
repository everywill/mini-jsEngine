const ASTList = require('../../ast-root/ASTList')

class NullStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
}

module.exports = NullStmnt
