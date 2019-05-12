class OptStoneObject {
  constructor(optClassInfo) {
    this.optClassInfo = optClassInfo
    this.fields = []
  }
  read(mark) {
    if (typeof mark === 'number') {
      return this.fields[mark]
    }
    let index = this.optClassInfo.fieldIndex(mark)
    if (index !== -1) {
      return this.fields[index]
    }
    index = this.optClassInfo.methodIndex(mark)
    if (index !== -1) {
      return this.method(index)
    }
    throw new Error(`bad access: ${mark}`)
  }
  write(mark, value) {
    if (typeof mark === 'number') {
      return this.fields[mark] = value
    }
    let index = this.optClassInfo.fieldIndex(mark)
    if (index !== -1) {
      this.fields[index] = value
    } else {
      // console.log(typeof mark)
      throw new Error(`bad assign: ${mark}`)
    }
  }
  method(index) {
    return this.optClassInfo.method(this, index)
  }
}

module.exports = OptStoneObject
