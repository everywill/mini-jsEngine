"use strict";

class ASTList {
  constructor(tokenList) {
    this.children = tokenList;
  }

  [Symbol.iterator]() {
    return this.children[Symbol.iterator]();
  }

  get numChildren() {
    return this.children.length;
  }

  get location() {
    for (let child of this.children) {
      let l = child.location();

      if (l != null) {
        return l;
      }
    }

    return null;
  }

  toString() {
    let s = '(';

    for (let child of this.children) {
      s = s + child.toString();
    }

    return s + ')';
  }

  child(i) {
    return this.children[i];
  }

}

module.exports = ASTList;