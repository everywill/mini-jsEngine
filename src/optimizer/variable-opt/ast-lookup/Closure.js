const mixin = require('../../../utils/decorator-mixin')
const { Symbols } = require('../../Symbols')

const ClosureLookup = mixin({
  lookup(symbols) {
    let newSyms = new Symbols(symbols)
    this.parameters.lookup(newSyms)
    this.body.lookup(newSyms)
  }
})

module.exports = ClosureLookup
