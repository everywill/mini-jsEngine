const mixin = require('../../../utils/decorator-mixin')
const ClassInfo = require('../ClassInfo')
const StoneObject = require('../StoneObject')
const { NestedEnv } = require('../../environment')

const DotEval = mixin({
  initObject(classInfo, env) {
    if (classInfo.superClass) {
      // 父类继承
      this.initObject(classInfo.superClass, env)
    }
    // 子类覆盖
    classInfo.body.eval(env)
  },
  eval(env, target) {
    let member = this.name
    if (target instanceof ClassInfo) {
      if (member === 'new') {
        let classInfo = target
        let nestEnv = new NestedEnv(env)
        let so = new StoneObject(nestEnv)
        nestEnv.putNew('this', so)
        this.initObject(classInfo, nestEnv)
        return so
      }
    } else if (target instanceof StoneObject) {
      return target.read(member)
    }
    throw new Error(`bad member access: ${member} of ${target.toString()}`)
  }
})

module.exports = DotEval
