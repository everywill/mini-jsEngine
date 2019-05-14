class Opcode {

}

Opcode.NCONST = 1 // load a number
Opcode.SCONST = 3 // load a string
Opcode.MOVE = 4 // move a value
Opcode.IFZERO = 6 // branch if false
Opcode.CALL = 8 // call a function
Opcode.RETURN = 9 // return
Opcode.ADD = 13 // add
Opcode.SUB = 14 // substract
Opcode.MUL = 15 // multiply
Opcode.DIV = 16 // divide
Opcode.REM = 17 // remainder
Opcode.EQUAL = 18 // equal
Opcode.MORE = 19 // more than
Opcode.LESS = 20 // less than


module.exports = Opcode
