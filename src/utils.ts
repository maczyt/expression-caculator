import PeekIterator from "./PeekIterator";
import PeekTokenIterator from "./PeekTokenIterator";
import Token from "./lexer/Token";
import arrayToGenerator from "./arrayToGenerator";
import TokenTypes from "./lexer/TokenTypes";

export class Stack extends Array {
  constructor() {
    super()
  }
  // 栈顶
  get head() {
    return this[this.length - 1]
  }
}

export function inFixToSuffix(it: PeekTokenIterator) {
  const resQueue = []
  const stack = new Stack()
  const ops = ['*', '/', '+', '-']
  let c = null
  while (it.hasNext()) {
    c = it.next().getValue()
    if (/\d/.test(c)) {
      resQueue.push(c)
      continue
    }
    if (c === '(') {
      stack.push(c)
      continue
    }
    if (c === ')') {
      let _c1 = stack.pop()
      while (_c1 !== '(') {
        resQueue.push(_c1)
        _c1 = stack.pop()
      }
      continue
    }
    if (c === '*' || c === '/') {
      while (stack.head && ['*', '/'].indexOf(stack.head) !== -1) {
        resQueue.push(stack.pop())
      }
      stack.push(c)
      continue
    }
    if (c === '+' || c === '-') {
      while (stack.head && ops.indexOf(stack.head) !== -1) {
        resQueue.push(stack.pop())
      }
      stack.push(c)
      continue
    }
  }
  while (stack.head) {
    resQueue.push(stack.pop())
  }
  console.log('res', resQueue)
  return new PeekTokenIterator(arrayToGenerator(resQueue.map(item => {
    return new Token(
      ops.indexOf(item) !== -1 ? TokenTypes.OPERATOR : TokenTypes.NUMBER,
      item
    )
  })))
}