const mixin = require('../../../utils/decorator-mixin')

const NameLookup = mixin({
  lookup(symbols) {
    let location = symbols.get(this.name)
    if (location) {
      this.nestHierarchy = location.nestHierarchy
      this.index = location.index
    } else {
      this.index = undefined
    }
  },
  lookupForAssign(symbols) {
    let location = symbols.put(this.name)
    this.nestHierarchy = location.nestHierarchy
    this.index = location.index
  }
})

module.exports = NameLookup
