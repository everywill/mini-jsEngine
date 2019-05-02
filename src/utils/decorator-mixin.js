function mixin(behaviour) {
  const instanceKeys = Reflect.ownKeys(behaviour)

  function _mixin(clazz) {
    for (let property of instanceKeys) {
      Object.defineProperty(clazz.prototype, property, {value: behaviour[property]})
    }
    return clazz
  }
  return _mixin
}

module.exports = mixin
