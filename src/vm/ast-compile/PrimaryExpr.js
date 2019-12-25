const mixin = require('../../utils/decorator-mixin')

const PrimaryExprCompile = mixin({
  compile(code) {
    this.compileSubExpr(code)
  },
  compileSubExpr(code, nestHierarchy) {
    if ()
  }
})

module.exports = PrimaryExprCompile
