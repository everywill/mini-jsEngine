const Symbols = require('./Symbols')
const Location = require('../Location')

class MemberSymbols extends Symbols {
  constructor(outer, type) {
    super(outer)
    this.type = type
  } 
  get(name, nestHierarchy = 0) {
    let index = this.find(name)
    if (index === -1) {
      if (this.outer) {
        return this.outer.get(name, nestHierarchy)
      }
      return null
    }
    return new Location(this.type, index)
  }
  put(name) {
    let loc = this.get(name)
    if (loc) {
      return loc
    }
    return new Location(this.type, this.add(name))
  }
}

// 针对成员和方法特殊的nestHierarchy
MemberSymbols.METHOD = -1
MemberSymbols.FIELD = -2

module.exports = MemberSymbols
