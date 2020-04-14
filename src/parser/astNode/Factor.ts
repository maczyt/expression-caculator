import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../../PeekTokenIterator";
import ASTNode from "./ASTNode";

class Factor extends ASTNode {
  constructor(parent, it: PeekTokenIterator) {
    super(parent, ASTNodeTypes.FACTOR, '')
    const token = it.next()
    this.setLexeme(token)
    this.label = token.getValue()
  }
}

export default Factor