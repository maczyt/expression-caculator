import Token from "../../lexer/Token"
import ASTNodeTypes from "./ASTNodeTypes"

class ASTNode {
  private parent: ASTNode
  private children: Array<ASTNode>
  // 当前节点的符号流
  private lexeme: Token
  // 当前节点的显示label, 其实也就是lexeme符号流的value
  label: string
  type: ASTNodeTypes

  constructor(parent: ASTNode=null, type, label) {
    this.parent = parent
    this.type = type
    this.label = label
    this.children = []
    this.lexeme = null
  }
  setLexeme(lexeme: Token) {
    this.lexeme = lexeme
  }
  getLexeme(): Token {
    return this.lexeme
  }

}

export default ASTNode