"use strict";

class BasicEnv {
  constructor() {
    this.values = {};
  }

  put(key, value) {
    this.values[key] = value;
  }

  get(key) {
    return this.values[key];
  }

}

module.exports = BasicEnv;