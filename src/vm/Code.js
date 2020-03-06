class Code {
  constructor(stoneVM) {
    this.stoneVM = stoneVM
    this.codeSize = 0
    this.numOfStrings = 0
  }
  get position() {
    return this.codeSize
  }
  set(short, pos) {
    // set a short value at position [pos]
    let remain = short
    this.stoneVM.code[pos] = remain >> 8
    remain = remain - (remain >> 8) << 8
    this.stoneVM.code[pos + 1] = remain
  }
  addByte(byte) {
    this.stoneVM.code[this.codeSize++] = byte
  }
  addShort(short) {
    let remain = short
    this.addByte(remain >> 8)
    remain = remain - (remain >> 8) << 8
    this.addByte(remain)
  }
  add(int) {
    let remain = int
    this.addByte(remain >> 24)
    remain = remain - (remain >> 24) << 24
    this.addByte(remain >> 16)
    remain = remain - (remain >> 16) << 16
    this.addByte(remain >> 8)
    remain = remain - (remain >> 8) << 8
    this.addByte(remain)
  }
  record(s) {
    this.stoneVM.strings[this.numOfStrings] = s
    return this.numOfStrings++
  }
}

module.exports = Code
