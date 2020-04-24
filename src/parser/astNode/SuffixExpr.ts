import PeekTokenIterator from "../../PeekTokenIterator";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";
import { Stack } from '../../utils'


// 后缀 不需要优先级表了, 已经优先级处理过了
class SuffixExpr extends ASTNode {
  constructor(parent: ASTNode, type?, label?) {
    super(parent, type, label);
  }
  static fromToken(token: Token, type: ASTNodeTypes): SuffixExpr {
    const expr = new SuffixExpr(null);
    expr.setLexeme(token);
    expr.label = token.getValue();
    expr.type = type;
    return expr;
  }
  static parseExpr(it: PeekTokenIterator) {
    let c: Token = null
    const stack = new Stack()
    const isNumber = /\d/
    const isOp = /[+\-*/]/
    while (it.hasNext()) {
      c = it.next();
      if (isNumber.test(c.getValue())) {
        stack.push(c)
        continue
      }
      if (isOp.test(c.getValue())) {
        const opExpr = SuffixExpr.fromToken(c, ASTNodeTypes.BINARY_EXPR)
        let right = stack.pop()
        let left = stack.pop()
        if (!(left instanceof SuffixExpr)) {
          left = SuffixExpr.fromToken(left, ASTNodeTypes.FACTOR)
        }
        if (!(right instanceof SuffixExpr)) {
          right = SuffixExpr.fromToken(right, ASTNodeTypes.FACTOR)
        }
        opExpr.addChild(left)
        opExpr.addChild(right)
        stack.push(opExpr)
        continue
      }
    }
    return stack.head
  }
}

export default SuffixExpr;
