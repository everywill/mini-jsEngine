const NativeFunction = require('../native-evaluator/NativeFunction')
const mixin = require('../../utils/decorator-mixin')
const { performance } = require('perf_hooks');

// 增加对原生函数的支持
const nativeFuncWrap = mixin({
  appendNatives(rootSyms) {
    // eslint-disable-next-line
    this.append('log', console.log)
    this.append('nowTime', performance.now)
  },
  append(name, method) {
    this.put(name, new NativeFunction(name, method))
  }
})

module.exports = nativeFuncWrap
