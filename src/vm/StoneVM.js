const Opcode = require('./Opcode')

class StoneVm {
  constructor(options) {
    // 代码区
    this.code = []
    // 栈区
    this.stack = []
    // 字符串常量区
    this.strings = []
    // 寄存器
    this.registers = []
    // 堆区
    this.heap = options.heapMemory
  }
  getReg(index) {
    this.registers[index]
  }
  setReg(index, value) {
    this.registers[index] = value
  }
  run(entryPointer) {
    // 代码指针
    this.pc = entryPointer
    // 栈帧指针
    this.fp = 0
    // 栈指针
    this.sp = 0
    // 函数调用返回指针
    this.ret = -1
    while (this.pc >= 0) {
      this.mainLoop()
    }
  }
  mainLoop() {
    switch(this.code[this.pc]) {
      case Opcode.NCONST:
        break;
      case Opcode.SCONST:
        break;
    }
  }
}

StoneVm.NUMBEROFREG = 6


module.exports = StoneVm
