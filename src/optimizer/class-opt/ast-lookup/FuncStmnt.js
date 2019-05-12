const mixin = require('../../../utils/decorator-mixin')
const { Symbols, SymbolThis } = require('../../Symbols')

const FuncStmntLookup = mixin({
  lookupAsMethod(fieldSyms) {
    let newSyms = new Symbols(fieldSyms)
    newSyms.put(SymbolThis.NAME)

    this.parameters.lookup(newSyms)
    this.body.lookup(newSyms)
  }
})

module.exports = FuncStmntLookup
