import Token from "../../lexer/Token"
import ASTNodeTypes from "./ASTNodeTypes"

class ASTNode {
  parent: ASTNode
  children: Array<ASTNode>
  // 当前节点的符号流
  lexeme: Token
  // 当前节点的显示label, 其实也就是lexeme符号流的value
  label: string
  type: ASTNodeTypes

  props: object

  constructor(parent: ASTNode=null, type, label) {
    this.parent = parent
    this.type = type
    this.label = label
    this.children = []
    this.lexeme = null
    this.props = {}
  }
  setLexeme(lexeme: Token) {
    this.lexeme = lexeme
  }
  getLexeme(): Token {
    return this.lexeme
  }
  getChild(index): ASTNode {
    return this.children[index]
  }
  addChild(node: ASTNode) {
    node.parent = this
    this.children.push(node)
  }

  setProp(key, value) {
    this.props[key] = value
  }
  getProp(key) {
    return this.props[key] || null
  }
  print(indent: number = 0) {
    console.log(`${''['padStart'](indent * 2, ' ')}${this.label}`)
    this.children.forEach(child => child.print(indent + 1))
  }
}

export default ASTNode