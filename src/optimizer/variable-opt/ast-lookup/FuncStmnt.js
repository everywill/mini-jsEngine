const mixin = require('../../../utils/decorator-mixin')
const { Symbols } = require('../../Symbols')

const FuncStmntLookup = mixin({
  lookup(symbols) {
    this.index = symbols.putNew(this.name)
    let newSyms = new Symbols(symbols)
    this.parameters.lookup(newSyms)
    this.body.lookup(newSyms)
  }
})

module.exports = FuncStmntLookup
