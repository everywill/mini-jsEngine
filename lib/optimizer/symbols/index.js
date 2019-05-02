"use strict";

class Location {
  constructor(nestHierarchy, index) {
    this.nestHierarchy = nestHierarchy;
    this.index = index;
  }

}

class Symbols {
  constructor(symbols) {
    this.outer = symbols;
    this.nameTable = [];
  }

  find(name) {
    return this.nameTable.indexOf(name);
  }

  get(name, nestHierarchy = 0) {
    let index = this.find(name);

    if (index === -1) {
      if (this.outer) {
        return this.outer.get(name, nestHierarchy + 1);
      } else {
        return null;
      }
    }

    return new Location(nestHierarchy, index);
  }

  add(name) {
    const length = this.nameTable.push(name);
    return length - 1;
  }

  put(name) {
    let loc = this.get(name);

    if (loc) {
      return loc;
    }

    return new Location(0, this.add(name));
  }

  putNew(name) {
    let index = this.find(name);

    if (index === -1) {
      return this.add(name);
    }

    return index;
  }

}

module.exports = {
  Symbols
};