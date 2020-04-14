import PeekIterator from "./PeekIterator";
import Token from "./lexer/Token";
import ParseError from "./ParseError";

class PeekTokenIterator extends PeekIterator<Token> {
  constructor(it: Generator<Token>) {
    super(it)
  }

  nextMatch(value) {
    const token = this.next()
    if (token.getValue() !== value) {
      throw ParseError.fromToken(token)
    }
    return token
  }
  nextMatch1(type) {
    const token = this.next()
    if (token.getType() !== type) {
      throw ParseError.fromToken(token)
    }
    return token
  }
}

export default PeekTokenIterator