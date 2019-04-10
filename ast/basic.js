const { ASTLeaf, ASTList } = require('./root-type')

class StringLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get value() {
    return this.token.value
  }
  eval() {
    return this.value
  }
}

class NumberLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get value() {
    return parseFloat(this.token.value)
  }
  eval() {
    return this.value
  }
}

class Name extends ASTLeaf {
  constructor(token) {
    super(token)
  }
  get name() {
    return this.token.value
  }
  eval(env) {
    let value = env.get(this.name)
    return value
  }
}

class BinaryExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get left() {
    return this.child(0)
  }
  get operator() {
    return this.child(1)
  }
  get right() {
    return this.child(2)
  }
  eval(env) {
    let op = this.operator.name
    if (op === '=') {
      let right = this.right.eval(env)

      return this.computeAssign(env, right)
    } else {
      let left = this.left.eval(env)
      let right = this.right.eval(env)

      return this.computeOp(left, op, right)
    }
  }
  computeAssign(env, rvalue) {
    let left = this.left
    if (left instanceof Name) {
      env.put(left.name, rvalue)
      return rvalue
    } else {
      throw 'invalid assignment'
    }
  }
  computeOp(lvalue, op, rvalue) {
    if (typeof lvalue === 'number' && typeof rvalue === 'number') {
      return this.computeNumber(lvalue, op, rvalue)
    } else {
      if (op === '+') {
        // 字符串拼接
        return `${lvalue}${rvalue}`
      } else if (op === '==') {
        return lvalue == rvalue
      } else {
        throw 'bad type'
      }
    }
  }
  computeNumber(lvalue, op, rvalue) {
    if (op === '+') {
      return lvalue + rvalue
    } else if (op === '-') {
      return lvalue - rvalue
    } else if (op === '*') {
      return lvalue * rvalue
    } else if (op === '/') {
      return lvalue / rvalue
    } else if (op === '%') {
      return lvalue % rvalue
    } else if (op === '==') {
      return lvalue == rvalue
    } else if (op === '>') {
      return lvalue > rvalue
    } else if (op === '<') {
      return lvalue < rvalue
    } else {
      throw 'invalid operator'
    }
  }
}

class NegativeExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get operand() {
    return this.child(1)
  }
  toString() {
    return `-${this.operand}`
  }
  eval(env) {
    let v = this.operand.eval(env)
    if (typeof v === 'number') {
      return -v
    } else {
      throw 'bad type for -'
    }
  }
}

class BlockStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  eval(env) {
    let result = 0
    for (let stmnt of this) {
      result = stmnt.eval(env)
    }
    return result
  }
}

class IfStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get condition() {
    return this.child(0)
  }
  get thenBlock() {
    return this.child(1)
  }
  get elseBlock() {
    return this.numChildren() > 2 ? this.child(2) : null
  }
  toString() {
    return `(if ${this.condition} ${this.thenBlock} else ${this.elseBlock})`
  }
  eval(env) {
    let condition = this.condition.eval(env)
    if (condition != false) {
      return this.thenBlock.eval(env)
    } else {
      let b = this.elseBlock
      if (b == null) {
        return 0
      } else {
        return b.eval(env)
      }
    }
  }
}

class WhileStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get condition() {
    return this.child(0)
  }
  get body() {
    return this.child(1)
  }
  toString() {
    return `(while ${this.condition} ${this.body})`
  }
  eval(env) {
    let result = 0
    for(;;) {
      let condition = this.condition.eval(env)
      if (condition == false) {
        return result
      } else {
        this.body.eval(env)
      }
    }
  }
}

module.exports = {
  StringLiteral,
  NumberLiteral,
  Name,
  BinaryExpr,
  NegativeExpr,
  BlockStmnt,
  IfStmnt,
  WhileStmnt,
}
