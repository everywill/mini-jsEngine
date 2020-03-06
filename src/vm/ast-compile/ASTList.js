const mixin = require('../../utils/decorator-mixin')

const ASTListCompile = mixin({
  compile(code) {
    for (let child of this.children) {
      child.compile(code);
    }
  }
})

module.exports = ASTListCompile;
