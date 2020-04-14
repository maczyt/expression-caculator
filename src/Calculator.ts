import PeekIterator from "./PeekIterator"
import Lexer from "./lexer/Lexer"
import Parser from "./parser/Parser"
import arrayToGenerator from "./arrayToGenerator"
import PeekTokenIterator from "./PeekTokenIterator"
import ASTNode from "./parser/astNode/ASTNode"
import TokenTypes from "./lexer/TokenTypes"
import ParseError from "./ParseError"

class Calculator {
  static exculate(source: string) {
    const it = new PeekIterator(arrayToGenerator([...source]), '\0')
    const lexer = new Lexer()
    const tokens = lexer.analyse(it)
    const parser = new Parser()
    const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))
    const ast = parser.parse(tokensIt)
    // console.log('ast', ast)
    ast.print()
    return Calculator.getNodeValue(ast)
  }

  static getNodeValue(node: ASTNode) {
    const token = node.getLexeme()
    const type = token.getType()
    const value = token.getValue()

    if (type === TokenTypes.OPERATOR) {
      return eval(`${Calculator.getNodeValue(node.getChild(0))} ${value} ${Calculator.getNodeValue(node.getChild(1))}`)
    } else if (type === TokenTypes.NUMBER) {
      return Number(value)
    } else {
      throw ParseError.fromToken(token)
    }
  }
}

export default Calculator