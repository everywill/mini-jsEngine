"use strict";

function hashcode(str) {
  let hash = 0;
  let chr;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

module.exports = hashcode;