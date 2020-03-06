const mixin = require('../../utils/decorator-mixin')

const PrimaryExprCompile = mixin({
  compile(code) {
    this.compileSubExpr(code)
  },
  compileSubExpr(code, nestHierarchy) {
    if (this.hasPostfix(nestHierarchy)) {
      this.compileSubExpr(code, nestHierarchy + 1);
      this.postfix(nestHierarchy).compile(code);
    } else {
      this.operand.compile(code)
    }
  }
})

module.exports = PrimaryExprCompile
