class TypeEnv {
  constructor(typeEnv) {
    this.outer = typeEnv
    this.types = []
  }
  get(nestHierarchy, index) {
    if (nestHierarchy === 0) {
      return this.types[index]
    } else if (!this.outer) {
      return null;
    } else {
      return this.outer.get(nestHierarchy - 1, index)
    }
  }
  put(nestHierarchy, index, typeInfo) {
    let oldType
    if (nestHierarchy === 0) {
      oldType = this.types[index]
      this.types[index] = typeInfo
      return oldType
    } else if (!this.outer) {
      throw new Error('no outer type environment')
    } else {
      return this.outer.put(nestHierarchy - 1, index, typeInfo)
    }
  }
}

module.exports = TypeEnv
