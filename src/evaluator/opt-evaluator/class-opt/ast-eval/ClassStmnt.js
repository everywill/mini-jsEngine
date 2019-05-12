const mixin = require('../../../../utils/decorator-mixin')
const { MemberSymbols, SymbolThis } = require('../../../../optimizer/Symbols')
const OptClassInfo = require('../../OptClassInfo')

const ClassStmntEval = mixin({
  eval(env) {
    let methodSyms = new MemberSymbols(env.names, MemberSymbols.METHOD)
    let fieldsSyms = new MemberSymbols(methodSyms, MemberSymbols.FIELD)

    let optClassInfo = new OptClassInfo(this, env, methodSyms, fieldsSyms)
    env.put(this.name, optClassInfo)

    let methodDefs = []

    if (optClassInfo.superClass) {
      optClassInfo.superClass.copyTo(fieldsSyms, methodSyms, methodDefs)
    }

    let symbolThis = new SymbolThis(fieldsSyms)
    this.body.lookup(symbolThis, methodSyms, fieldsSyms, methodDefs)

    optClassInfo.setMethods(methodDefs)

    return this.name
  }
})

module.exports = ClassStmntEval
