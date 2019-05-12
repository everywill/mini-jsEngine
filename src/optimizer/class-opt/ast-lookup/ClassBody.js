const mixin = require('../../../utils/decorator-mixin')
const { FuncStmnt } = require('../../../parser/function-parser/ast')

const ClassBodyLookup = mixin({
  lookup(symbolThis, methodSyms, fieldSyms, methodDefs) {
    for (let stmnt of this) {
      if (stmnt instanceof FuncStmnt) {
        let oldSize = methodSyms.oldSize
        let index = methodSyms.putNew(stmnt.name)
        if (index >= oldSize) {
          methodDefs.push(stmnt)
        } else {
          methodDefs[index] = stmnt
        }
        stmnt.lookupAsMethod(fieldSyms)
      } else {
        stmnt.lookup(symbolThis)
      }
    }
  }
})

module.exports = ClassBodyLookup
