import PeekIterator from "../PeekIterator";
import Token from "./Token";

class Lexer {
  constructor() {}

  analyse(it: PeekIterator): Array<Token> {
    const tokens = []
    while (it.hasNext()) {
      const c = it.next()
      if (c === '\n') break
      if (/[+\-*/]/.test(c)) {
        it.putBack()
        tokens.push(Token.makeOperator(it))
      } else if (/[0-9]/.test(c)) {
        it.putBack()
        tokens.push(Token.makeNumber(it))
      } else if (c === '(' || c === ')') {
        it.putBack()
        tokens.push(Token.makeBracket(it))
      }
    }
    return tokens
  }
}

export default Lexer