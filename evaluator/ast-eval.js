const { 
  StringLiteral,
  NumberLiteral,
  Name,
  BinaryExpr,
  NegativeExpr,
  BlockStmnt,
  IfStmnt,
  WhileStmnt,
} = require('../parser/ast')

function mixin(clazz, behaviour) {
  const instanceKeys = Reflect.ownKeys(behaviour)
  for (let property of instanceKeys) {
    Object.defineProperty(clazz.prototype, property, { value: behaviour[property] })
  }
}

mixin(StringLiteral, {
  eval: function() {
    return this.value
  }
})
mixin(NumberLiteral, {
  eval: function() {
    return this.value
  }
})
mixin(Name, {
  eval: function(env) {
    let value = env.get(this.name)
    return value
  }
})
mixin(BinaryExpr, {
  eval: function(env) {
    let op = this.operator.name
    if (op === '=') {
      let right = this.right.eval(env)

      return this.computeAssign(env, right)
    } else {
      let left = this.left.eval(env)
      let right = this.right.eval(env)

      return this.computeOp(left, op, right)
    }
  },
  computeAssign: function(env, rvalue) {
    let left = this.left
    if (left instanceof Name) {
      env.put(left.name, rvalue)
      return rvalue
    } else {
      throw 'invalid assignment'
    }
  },
  computeOp: function(lvalue, op, rvalue) {
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
  },
  computeNumber: function(lvalue, op, rvalue) {
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
})
mixin(NegativeExpr, {
  eval: function(env) {
    let v = this.operand.eval(env)
    if (typeof v === 'number') {
      return -v
    } else {
      throw 'bad type for -'
    }
  }
})
mixin(BlockStmnt, {
  eval: function(env) {
    let result = 0
    for (let stmnt of this) {
      result = stmnt.eval(env)
    }
    return result
  }
})
mixin(IfStmnt, {
  eval: function(env) {
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
})
mixin(WhileStmnt, {
  eval: function(env) {
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
})

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
