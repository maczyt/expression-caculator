import Expr from "./Expr";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../../PeekTokenIterator";

class Factor extends Expr {
  constructor(parent, it: PeekTokenIterator) {
    super(parent, ASTNodeTypes.FACTOR)
    const token = it.next()
    this.setLexeme(token)
    this.label = token.getValue()
  }
}

export default Factor