class StoneObject {
  constructor(env) {
    this.env = env
  }
  getEnv(member) {
    let e = this.env.where(member)
    if (e && e === this.env) {
      return e
    }
    throw new Error('member not existing')
  }
  read(member) {
    return this.getEnv(member).get(member)
  }
  write(member, value) {
    (this.getEnv(member)).putNew(member, value)
  }
  toString() {
    return `<object:>`
  }
}

module.exports = StoneObject
