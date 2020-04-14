import PeekTokenIterator from "../PeekTokenIterator";
import Expr from "./astNode/Expr";
import ParseError from "../ParseError";

class Parser {
  constructor() {}
  parse(it: PeekTokenIterator) {
    const expr = Expr.parseExpr(it)
    if (it.hasNext()) {
      // 有语法错误导致
      throw ParseError.fromToken(it.peek())
    }
    return expr
  }
}

export default Parser