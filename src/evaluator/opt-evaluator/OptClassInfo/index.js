const ClassInfo = require('../../class-evaluator/ClassInfo')
const OptMethod = require('../OptMethod')

class OptClassInfo extends ClassInfo {
  constructor(classStmnt, env, methodsSyms, fieldsSyms) {
    super(classStmnt, env)
    this.methodsSyms = methodsSyms
    this.fieldsSyms = fieldsSyms
    this.methodDefs = []
  }
  fieldIndex(name) {
    return this.fieldsSyms.find(name)
  }
  methodIndex(name) {
    return this.methodsSyms.find(name)
  }
  method(optStoneObject, index) {
    let methodDef = this.methodDefs[index]
    return new OptMethod(methodDef.parameters,methodDef.body, this.environment, optStoneObject)
  }
}

module.exports = OptClassInfo
