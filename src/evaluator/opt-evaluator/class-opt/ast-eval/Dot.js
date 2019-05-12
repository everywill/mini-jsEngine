const mixin = require('../../../../utils/decorator-mixin')
const OptClassInfo = require('../../OptClassInfo')
const OptStoneObject = require('../../OptStoneObject')

const DotEval = mixin({
  initObject(optClassInfo, optStoneObject, env) {
    if (optClassInfo.superClass) {
      this.initObject(optClassInfo, optStoneObject, env)
    }
    optClassInfo.body.eval(env)
  },
  eval(env, target) {
    let member = this.name
    if (target instanceof OptClassInfo) {
      if (member === 'new') {
        let optStoneObject = new OptStoneObject(target)

        return optStoneObject
      }
    } else if (target instanceof OptStoneObject) {
      return target.read(member)
    }
    throw new Error(`bad member access: ${member}`)
  },

})

module.exports = DotEval
