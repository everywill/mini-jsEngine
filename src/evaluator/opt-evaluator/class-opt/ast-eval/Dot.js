const mixin = require('../../../../utils/decorator-mixin')
const OptClassInfo = require('../../OptClassInfo')
const OptStoneObject = require('../../OptStoneObject')
const { ArrayEnv } = require('../../../environment')

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
        let newEnv = new ArrayEnv(target.environment)
        newEnv.put(0, 0, optStoneObject)

        this.initObject(target, optStoneObject, newEnv)

        return optStoneObject
      }
    } else if (target instanceof OptStoneObject) {
      // return target.read(member)
      // InlineCache
      if (target.optClassInfo != this.optClassInfo) {
        this.updateCache(target)
      }
      if (this.isField) {
        return target.read(this.index)
      } else {
        return target.method(this.index)
      }
    }
    throw new Error(`bad member access: ${member}`)
  },
  updateCache(optStoneObject) {
    this.optClassInfo = optStoneObject.optClassInfo
    let member = this.name
    let index = this.optClassInfo.fieldIndex(member)
    if (index !== -1) {
      this.isField = true
      this.index = index
      return
    }
    index = this.optClassInfo.methodIndex(member)
    if (index !== -1) {
      this.isField = false
      this.index = index
      return
    }
    throw new Error(`bad member access: ${member}`)
  } 
})

module.exports = DotEval
