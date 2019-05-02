"use strict";

const mixin = require('../../../utils/decorator-mixin');

const FunctionEntity = require('../FunctionEntity');

const FuncStmntEval = mixin({
  eval(env) {
    // 在当前env中保存函数定义
    env.putNew(this.name, new FunctionEntity(this.parameters, this.body, env));
    return this.name;
  }

});
module.exports = FuncStmntEval;