const Opcode = require('./Opcode')
const VmFunction = require('../evaluator/vm-evaluator/VmFunction')
const NativeFunction = require('../evaluator/native-evaluator/NativeFunction')

class StoneVm {
  constructor(options) {
    const { codeSize, stackSize, stringSize, heapMemory } = options
    // 栈区
    this.stack = []
    // 字符串常量区
    this.strings = []
    // 寄存器
    this.registers = []
    // 堆区
    this.heap = heapMemory
    // 代码区
    this.code = new Int8Array(new ArrayBuffer(codeSize))

    this.codeSize = codeSize
    this.stackSize = stackSize
    this.stringSize = stringSize
  }
  static get NUMBEROFREG() {
    return 6
  }
  static get SAVEAREASIZE() {
    // 保存寄存器： 6个通用寄存器 + fp + ret
    return 6 + 2
  }
  static get TRUE() {
    return 1
  }
  static get FALSE() {
    return 0
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
      // load 32bit number to register
      case Opcode.NCONST:
        this.registers[Opcode.decodeRegister(this.code[this.pc + 5])] = this.readNum(this.pc + 1)
        this.pc += 6
        break
      // load string to register
      case Opcode.SCONST:
        this.registers[Opcode.decodeRegister(this.code[this.pc + 3])] = this.strings[this.readShort(this.pc + 1)]
        this.pc += 4
        break
      // move a value between register and stack
      case Opcode.MOVE:
        this.moveValue()
        break
      // move a value between register and heap
      case Opcode.GMOVE:
        this.moveHeapValue()
        break
      // branch if else
      case Opcode.IFZERO: {
        let value = this.registers[Opcode.decodeRegister(this.code[this.pc + 1])]
        if (typeof value === 'number' && value === 0) {
          // 16bit 跳转
          this.pc += this.readShort(this.pc + 2)
        } else {
          this.pc += 4
        }
        break
      }
      // function call
      case Opcode.CALL:
        this.callFunction()
        break
      // function return
      case Opcode.RETURN:
        this.pc = this.ret
        break
      case Opcode.SAVE:
        this.saveRegisters()
        break
      case Opcode.RESTORE:
        this.restoreRegisters()
        break
      // reverse the sign of register
      case Opcode.NEG: {
        let regNo = Opcode.decodeRegister(this.code[this.pc + 1])
        let value = this.registers[regNo]
        if (typeof value === 'number') {
          this.registers[regNo] = -value
        } else {
          throw new Error('oprand is not a number!')
        }
        this.pc += 2
        break
      }
      // calculate
      default:
        if (this.code[this.pc] > Opcode.LESS) {
          throw new Error('bad instruction')
        } else {
          this.computeNumber()
        }
        break
    }
  }
  readNum(index) {
    const array = this.code
    return (array[index] << 24) | ((array[index + 1] & 0xff) << 16) | ((array[index + 2] & 0xff) << 8) | (array[index + 3] & 0xff)
  }
  readShort(index) {
    const array = this.code
    return ((array[index] & 0xff) << 8) | (array[index + 1] & 0xff)
  }
  moveValue() {
    let src = this.code[this.pc + 1]
    let dest = this.code[this.pc + 2]
    let value

    if (Opcode.isRegister(src)) {
      value = this.registers[Opcode.decodeRegister(src)]
    } else {
      value = this.stack[this.fp + Opcode.decodeOffset(src)]
    }

    if (Opcode.isRegister(dest)) {
      this.registers[Opcode.decodeRegister(dest)] = value
    } else {
      this.stack[this.fp + Opcode.decodeOffset(dest)] = value
    }

    this.pc += 3
  }
  moveHeapValue() {
    let src = this.code[this.pc + 1]
    if (Opcode.isRegister(src)) {
      let dest = this.readShort(this.pc + 2)
      this.heap.write(dest, this.registers[Opcode.decodeRegister(src)])
    } else {
      src = this.readShort(this.pc + 1)
      this.registers[Opcode.decodeRegister(this.code[this.pc + 3])] = this.heap.read(src)
    }
  }
  callFunction() {
    let func = this.registers[Opcode.decodeRegister(this.code[this.pc + 1])]
    let numOfArgs = this.code[this.pc + 2]
    if (func instanceof VmFunction && func.parameters.size === numOfArgs) {
      // ret记录下一条指令
      this.ret = this.pc + 3
      // 代码跳转
      this.pc = func.entry
    } else if (func instanceof NativeFunction) {
      let args = []
      for (let i = 0; i < numOfArgs; i++) {
        args[i] = this.stack[this.sp + i]
      }
      this.stack[this.sp] = func.invoke(args, null)
      this.pc += 3
    } else {
      throw new Error('bad function call')
    }
  }
  saveRegisters() {
    let size = Opcode.decodeOffset(this.code[this.pc + 1])
    let dest = size + this.sp
    for (let i = 0; i < StoneVm.NUMBEROFREG; i++) {
      this.stack[dest++] = this.registers[i]
    }
    this.stack[dest++] = this.fp
    this.stack[dest++] = this.ret
    this.fp = this.sp
    this.sp += size + StoneVm.SAVEAREASIZE
    this.pc += 2
  }
  restoreRegisters() {
    let dest = Opcode.decodeOffset(this.code[this.pc + 1]) + this.fp
    for (let i = 0; i < StoneVm.NUMBEROFREG; i++) {
      this.registers[i] = this.stack[dest++]
    }
    this.sp = this.fp
    this.fp = this.stack[dest++]
    this.ret = this.stack[dest++]
    this.pc += 2
  }
  computeNumber() {
    let leftRegNo = Opcode.decodeRegister(this.code[this.pc + 1])
    let rightRegNo = Opcode.decodeRegister(this.code[this.pc + 2])
    let leftValue = this.registers[leftRegNo]
    let rightvalue= this.registers[rightRegNo]
    let areNumbers = typeof leftValue === 'number' && typeof rightvalue === 'number'
    if (this.code[this.pc] === Opcode.ADD && !areNumbers) {
      this.registers[leftRegNo] = `${leftValue}${rightvalue}`
    } else if (this.code[this.pc] === Opcode.EQUAL && !areNumbers) {
      this.registers[leftRegNo] = leftValue === rightvalue ? StoneVm.TRUE : StoneVm.FALSE
    } else {
      if (!areNumbers) {
        throw new Error('operand not number!')
      }
      let result
      switch (this.code[this.pc]) {
        case Opcode.ADD:
          result = leftValue + rightvalue
          break
        case Opcode.SUB:
          result = leftValue - rightvalue
          break
        case Opcode.MUL:
          result = leftValue * rightvalue
          break
        case Opcode.DIV: 
          result = leftValue / rightvalue
          break
        case Opcode.REM:
          result = leftValue % rightvalue
          break
        case Opcode.EQUAL: {
          if (isNaN(leftValue)) {
            result = isNaN(rightvalue) ? StoneVm.TRUE : StoneVm.FALSE
          } else {
            result = leftValue === rightvalue ? StoneVm.TRUE : StoneVm.FALSE
          }
          break
        }
        case Opcode.MORE: 
          result = leftValue > rightvalue ? StoneVm.TRUE : StoneVm.FALSE
          break
        case Opcode.LESS:
          result = leftValue < rightvalue ? StoneVm.TRUE : StoneVm.FALSE
          break
        default: 
          throw new Error('unkown calculate rule')
      }
      this.registers[leftRegNo] = result
    }
  }
}

module.exports = StoneVm
