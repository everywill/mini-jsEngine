"use strict";

const ASTList = require('../../ast/ASTList');

class Arguments extends ASTList {
  constructor(tokenList) {
    super(tokenList);
  }

  get size() {
    return this.numChildren;
  }

  eval(callerEnv, target) {
    if (target instanceof FunctionEntity === false) {
      // 如果apply的不是一个函数
      throw new Error('bad function');
    }

    let parameters = target.parameters; // 如果实参和形参数目不匹配

    if (this.size !== parameters.size) {
      throw new Error('bad number of arguments');
    }

    let funcEnv = target.makeEnv();
    let num = 0;

    for (let a of this) {
      parameters.eval(funcEnv, num++, a.eval(callerEnv));
    }

    return target.body.eval(funcEnv);
  }

}

module.exports = Arguments;