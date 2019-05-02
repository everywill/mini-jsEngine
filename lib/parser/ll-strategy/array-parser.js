"use strict";

const ClassParser = require('./class-parser');

const {
  NumberLiteral,
  Name,
  StringLiteral,
  PrimaryExpr,
  Arguments,
  Closure,
  Dot,
  ArrayLiteral,
  ArrayRef
} = require('../../ast');

class ArrayParser extends ClassParser {
  *elements() {
    let elements = [];
    let e = yield* this.expression();
    elements.push(e); // , 分割的数组元素

    while (yield* this.checkNextToken(',')) {
      e = yield* this.expression();
      elements.push(e);
    }

    return elements;
  }
  /* 
  **  override method primary in ClosureParser
  **  ("[" [ elements ] "]" | " closure " paramlist block | "(" expr ")" | NUMBER | IDENTIFIER | STRING ) { postfix }
  */


  *primary() {
    let p; // primary

    let a = []; // args

    let token = yield* this.nextToken();

    if (token.value === '[') {
      // 数组
      let elements = yield* this.elements();
      let anotherToken = yield* this.nextToken();

      if (anotherToken.value === ']') {
        // 括号能匹配 返回表达式
        p = new ArrayLiteral(elements);
      } else {
        // 否则解析出错
        throw new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`);
      }
    } else if (token.value === 'closure') {
      let paramList = yield* this.paramlist();
      let body = yield* this.block();
      p = new Closure([paramList, body]);
    } else if (token.value === '(') {
      // "(" expr ")"
      let e = yield* this.expression();
      let anotherToken = yield* this.nextToken(); // console.log('anotherToken: ')
      // console.log(anotherToken)

      if (anotherToken.value === ')') {
        // 括号能匹配 返回表达式
        p = e;
      } else {
        // 否则解析出错
        throw new Error(`Parse Error: no matching for backet ${token.value} at line ${token.lineNo}`);
      }
    } else if (token.type === 'number') {
      // NUMBER
      p = new NumberLiteral(token);
    } else if (token.type === 'identifier') {
      // IDENTIFIER
      if (this.reserved.indexOf(token.value) === -1) {
        p = new Name(token);
      } else {
        throw new Error(`Parse Error: bad Name ${token.value} at line ${token.lineNo}`);
      }
    } else if (token.type === 'string') {
      // STRING
      p = new StringLiteral(token);
    } else {
      throw new Error(`Parse Error: bad factor at line ${token.lineNo}: ${token.value}`);
    }

    let postfix;

    while ((postfix = yield* this.postfix()) !== null) {
      a.push(postfix);
    }

    if (a.length) {
      return new PrimaryExpr([p, ...a]);
    } else {
      return p;
    }
  }
  /* 
  **  override method postfix in ClassParser
  **  "(" [ expr { "," expr } ] ")" | "." IDENTIFIER | "[" expr "]"
  */


  *postfix() {
    let args = [];
    let token = yield* this.nextToken();

    if (token && token.value === '(') {
      let next;

      while (yield* this.checkNextToken(')', false)) {
        // 尚未到调用结尾
        next = yield* this.expression(); // console.log('args to push')
        // console.log(next)

        args.push(next);

        if (yield* this.checkNextToken(',')) {
          continue;
        }
      }

      return new Arguments(args);
    } else if (token && token.value === '.') {
      // 引入class之后的链式调用
      let token = yield* this.nextToken();

      if (token.type === 'identifier') {
        return new Dot([new Name(token)]);
      } else {
        throw new Error(`Parse Error: bad member name ${token.value} at line ${token.lineNo}`);
      }
    } else if (token && token.value === '[') {
      let e = yield* this.expression();

      if (yield* this.checkNextToken(']')) {
        return new ArrayRef([e]);
      }
    } else {
      this.queue.push(token);
      return null;
    }
  }

}

module.exports = ArrayParser;