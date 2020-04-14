import Token from "./lexer/Token"

class ParseError extends Error {
  constructor(msg: string) {
    super(msg)
  }
  
  static fromToken(token: Token) {
    return new ParseError(`Syntax error, Unexpected token ${token.getValue()}`)
  } 
}

export default ParseError