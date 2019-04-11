const { ASTList } = require('./root-type')
const { NestedEnv } = require('../evaluator/environment')
const hashcode = require('../utils/hashcode')

class FunctionEntity {
  constructor(parameters, body, env) {
    this.parameterList = parameters
    this.funcBody = body
    this.env = env
  }
  get parameters() {
    return this.parameterList
  }
  get body() {
    return this.funcBody
  }
  makeEnv() {
    return new NestedEnv(this.env)
  }
  toString() {
    return `<func: ${hashcode(JSON.stringify(this.body))}>`
  }
}

class ParameterList extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
  name(i) {
    return this.child(i).name
  }
  eval(env, index, value) {
    env.putNew(this.name(index), value)
  }
}

class Arguments extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get size() {
    return this.numChildren
  }
  eval(callerEnv, target) {
    // 如果apply的不是一个函数
    if (target instanceof FunctionEntity === false) {
      throw new Error('bad function')
    }
    let parameters = target.parameters
    // 如果实参和形参数目不匹配
    if (this.size !== parameters.size) {
      throw new Error('bad number of arguments')
    }
    let funcEnv = target.makeEnv()
    let num = 0
    for (let a of this) {
      parameters.eval(funcEnv, num++, a.eval(callerEnv))
    }
    return target.body.eval(funcEnv)
  }
}

class PrimaryExpr extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get operand() {
    return this.child(0)
  }
  postfix(nestHierarchy) {
    return this.child(this.numChildren - nestHierarchy - 1)
  }
  hasPostfix(nestHierarchy) {
    return this.numChildren - nestHierarchy - 1
  }
  evalSubExpr(env, nestHierarchy) {
    if (this.hasPostfix(nestHierarchy)) {
      let target = this.evalSubExpr(env, nestHierarchy + 1)
      return this.postfix(nestHierarchy).eval(env, target)
    } else {
      return this.operand.eval(env)
    }
  }
  eval(env) {
    return this.evalSubExpr(env, 0)
  }
}

class FuncStmnt extends ASTList {
  constructor(tokenList) {
    super(tokenList)
  }
  get name() {
    return this.child(0).name
  }
  get parameters() {
    return this.child(1)
  }
  get body() {
    return this.child(2)
  }
  toString() {
    return `(func ${this.name} ${this.parameters} ${this.body})`
  }
  eval(env) {
    // 在当前env中保存函数定义
    env.putNew(this.name, new FunctionEntity(this.parameters, this.body, env))
    return this.name
  }
}

module.exports = {
  ParameterList, 
  Arguments,
  PrimaryExpr,
  FuncStmnt,
}
