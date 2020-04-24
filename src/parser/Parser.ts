import PeekTokenIterator from "../PeekTokenIterator";
// import Expr from "./astNode/Expr";
import ParseError from "../ParseError";
import SuffixExpr from './astNode/SuffixExpr'
import Expr from "./astNode/Expr";

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
  parseSuffix(it: PeekTokenIterator) {
    const expr = SuffixExpr.parseExpr(it)
    if (it.hasNext()) {
      // 有语法错误导致
      throw ParseError.fromToken(it.peek())
    }
    return expr
  }
}

export default Parser