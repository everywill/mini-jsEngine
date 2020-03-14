class TypeEnv {
  constructor(typeEnv) {
    this.outer = typeEnv
    this.types = []
    this.equations = new Set()
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
  addEquation(unknownTypeInfo, typeInfo) {
    if (typeInfo.isUnknownType()) {
      if (typeInfo.resolved) {
        typeInfo = typeInfo.type()
      }
    }
    const eq = this.find(unknownTypeInfo)
    if (typeInfo.isUnknownType()) {
      eq.push(typeInfo)
    } else {
      for (let t of eq) {
        t.setType(typeInfo)
      }
      this.equations.delete(eq)
    }
  }
  find(unknownType) {
    for (let e of this.equations) {
      if (e.indexOf(unknownType) !== -1) {
        return e
      }
    } 
    const equation = []
    equation.push(unknownType)
    this.equations.add(equation)

    return equation
  }
}

module.exports = TypeEnv
