"use strict";

const NativeFuncParser = require('./native-func-parser');

const {
  Name,
  Arguments,
  ClassBody,
  ClassStmnt,
  Dot
} = require('../../ast');

class ClassParser extends NativeFuncParser {
  *member() {
    if (yield* this.checkNextToken('func')) {
      return yield* this.func();
    } else {
      return yield* this.expression();
    }
  }

  *classBody() {
    let members = [];
    let token = yield* this.nextToken();

    if (token.value === '{') {
      // 类成员定义开始
      let m;

      while (yield* this.checkNextToken('}', false)) {
        // console.log('enter paramlist while')
        m = yield* this.member();
        members.push(m);

        if (yield* this.checkNextToken(';')) {
          continue;
        }
      } // 代码块结束


      return new ClassBody(members);
    } else {
      throw new Error(`Parse Error: block missing { at ${token.lineNo}`);
    }
  }

  *classDef() {
    let name;
    let superClass;
    let classBody;
    let token = yield* this.nextToken();

    if (token.type === 'identifier') {
      name = new Name(token);
    } else {
      throw new Error(`Parse Error: bad class name ${token.value} at line ${token.lineNo}`);
    }

    if (yield* this.checkNextToken('extends')) {
      let token = yield* this.nextToken();

      if (token.type === 'identifier') {
        superClass = new Name(token);
      } else {
        throw new Error(`Parse Error: bad superclass name ${token.value} at line ${token.lineNo}`);
      }
    }

    classBody = yield* this.classBody();

    if (superClass) {
      return new ClassStmnt([name, superClass, classBody]);
    }

    return new ClassStmnt([name, classBody]);
  }
  /* 
  **  override method postfix in FunctionParser
  **  "(" [ expr { "," expr } ] ")" | "." IDENTIFIER
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
    } else {
      this.queue.push(token);
      return null;
    }
  }

}

module.exports = ClassParser;