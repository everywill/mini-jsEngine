const mixin = require('../../utils/decorator-mixin')

const ParameterListLookup = mixin({
  lookup(symbols) {
    this.offsets = []
    let size = this.size
    for(let i = 0; i < size; i ++) {
      this.offsets[i] = symbols.putNew(this.name(i))
    }
  }
})

module.exports = ParameterListLookup
