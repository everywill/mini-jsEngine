const mixin = require('../../../utils/decorator-mixin')
const FunctionEntity = require('../../function-evaluator/FunctionEntity')
const NativeFunction = require('../NativeFunction')

const ArgumentsEval = mixin({
  eval(callerEnv, target) {
    // console.log(target)
    // 支持调用原生函数
    if (target instanceof NativeFunction) {
      // native函数
      let args = []
      for (let a of this) {
        args.push(a.eval(callerEnv))
      }
      return target.invoke(args, this)
    } else {
      // 非native函数
      if (target instanceof FunctionEntity === false) {
        // 如果apply的不是一个函数
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
})

module.exports = ArgumentsEval
