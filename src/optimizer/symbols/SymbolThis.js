const Symbols = require('./Symbols')

class SymbolThis extends Symbols {
  constructor(symbols) {
    super(symbols)
    this.add('this')
  }
}

module.exports = SymbolThis
