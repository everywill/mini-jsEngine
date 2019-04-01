const WAIT_FACTOR_TOKEN = 0;
const WAIT_OPERATOR_TOKEN = 1;

class OpPrecedenceParser {
  constructor() {
    this.queue = [];
  }

  expression() {
    let right = this.factor()
    let next
    while ((next = this.nextOperator()) != null) {
      right = this.doShift(right, next.value)
    }

    return right
  }

  factor() {}

  nextOperator() {}

  doShift() {}

  run(token) {
    console.log('=== new token to parser ===')
    console.log(token)
    this.queue.push(token)
  }
  end() {
    console.log('=== parser end has been invoked ===')
  }
}

module.exports = new OpPrecedenceParser()
