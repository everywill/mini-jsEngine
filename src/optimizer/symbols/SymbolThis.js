const Symbols = require('./Symbols')

class SymbolThis extends Symbols {
  constructor(symbols) {
    super(symbols)
    this.add(SymbolThis.NAME)
  }
  putNew() {
    throw new Error('fatal: SymbolThis.putNew')
  }
  put(name) {
    let loc = this.outer.put(name)
    if(loc.nestHierarchy >= 0) {
      // -1为方法 -2位字段
      loc.nestHierarchy ++
    }
    
    return loc
  }
}

SymbolThis.NAME = 'this'

module.exports = SymbolThis
