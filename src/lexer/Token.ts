import TokenTypes from "./TokenTypes";
import PeekIterator from "../PeekIterator";
import LexialError from "../LexialError";

class Token<T=string> {
  private type: TokenTypes
  private value: T
  constructor(type: TokenTypes, value: T) {
    this.type = type
    this.value = value
  }
  getType(): TokenTypes {
    return this.type
  }
  getValue(): T {
    return this.value
  }

  static makeNumber(it: PeekIterator): Token {
    let state = 0
    let s = ''
    const num_reg = /[1-9]/
    const num_reg1 = /[0-9]/
    while (it.hasNext()) {
      // 吃掉但不消费
      const lookahead = it.peek()
      switch(state) {
        case 0:
          if (lookahead === '0') {
            state = 1
          } else if (num_reg.test(lookahead)) {
            state = 2
          }
          break
        case 1:
          if (lookahead === '0') {
            state = 1
          } else if (num_reg.test(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 3
          } else {
            return new Token(TokenTypes.NUMBER, s)
          }
          break
        case 2:
          if (num_reg1.test(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 3
          } else {
            return new Token(TokenTypes.NUMBER, s)
          }
          break
        case 3:
          if (num_reg1.test(lookahead)) {
            state = 4
          } else if (lookahead === '.') {
            throw LexialError.fromChar(lookahead)
          } else {
            return new Token(TokenTypes.NUMBER, s)
          }
          break
        case 4:
          if (num_reg1.test(lookahead)) {
            state = 4
          } else if (lookahead === '.') {
            throw LexialError.fromChar(lookahead)
          } else {
            return new Token(TokenTypes.NUMBER, s)
          }
          break
      }
      // 吃掉这个流
      it.next()
      s += lookahead
    }
    throw new LexialError('Unexpected error')
  }
  static makeBracket(it: PeekIterator): Token {
    // 吃掉一个流
    const val = it.next()
    return new Token(TokenTypes.BRACKET, val)
  }
  static makeOperator(it: PeekIterator): Token {
    const val = it.next()
    return new Token(TokenTypes.OPERATOR, val)
  }
}

export default Token