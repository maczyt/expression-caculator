import ASTNode from "./ASTNode";
import PeekTokenIterator from "../../PeekTokenIterator";
import Token from "../../lexer/Token";
import ASTNodeTypes from "./ASTNodeTypes";
import PriorityTable from "../PriorityTable";
import TokenTypes from "../../lexer/TokenTypes";
import Factor from "./Factor";
import ParseError from "../../ParseError";

class Expr extends ASTNode {
  constructor(parent: ASTNode, type?, label?) {
    super(parent, type, label);
  }

  static fromToken(token: Token, type: ASTNodeTypes): Expr {
    const expr = new Expr(null);
    expr.setLexeme(token);
    expr.label = token.getValue();
    expr.type = type;
    return expr;
  }

  /**
   * left: Expr(k) -> Expr(k) op(k) Expr(k+1) | Expr(k+1)
   * right:
   *  Expr(k) -> Expr(k+1) Expr_(k) // combine
   *  Expr_(k) -> op(k) Expr(k+1) Expr_(k) | ε // race
   *  // 终结条件
   *  Expr(t) -> Factor Expr_(t)
   *  Factor -> [0-9] | (Expr)
   * @static
   * @param {PeekTokenIterator} it
   * @returns {Expr}
   * @memberof Expr
   */
  static parseExpr(it: PeekTokenIterator): Expr {
    return Expr.parseE(it, 0);
  }
  // Expr(k) -> Expr(k+1) Expr_(k)
  // 或
  // Expr(t) -> Factor Expr_(t)；
  static parseE(it: PeekTokenIterator, k): Expr {
    if (k < PriorityTable.length) {
      return Expr.combine(
        it,
        () => Expr.parseE(it, k + 1),
        () => Expr.parseE_(it, k)
      );
    } else {
      return Expr.combine(
        it,
        () => Expr.parseF(it),
        () => Expr.parseE_(it, k)
      );
    }
  }
  // Expr_(k) -> op(k) Expr(k+1) Expr_(k) | ε
  static parseE_(it: PeekTokenIterator, k): Expr {
    // 吃掉op(k)
    const c = it.peek();
    const value = c.getValue();
    if (PriorityTable[k].indexOf(value) !== -1) {
      it.nextMatch(value); // 吃掉这个op流
      const expr = Expr.fromToken(c, ASTNodeTypes.BINARY_EXPR);
      // Expr(k+1) Expr_(k)
      expr.addChild(
        Expr.combine(
          it,
          () => Expr.parseE(it, k + 1),
          () => Expr.parseE_(it, k)
        )
      );
      return expr;
    }
    // ε
    return null;
  }
  // Factor -> [0-9] | (Expr)
  static parseF(it: PeekTokenIterator) {
    const token = it.peek()
    const value = token.getValue()
    const type = token.getType()
    if (value === '(') {
      it.nextMatch("(");
      const expr = Expr.parseExpr(it)
      it.nextMatch(")");
      return expr;
    } else if (type === TokenTypes.NUMBER) {
      return new Factor(null, it)
    }
    throw ParseError.fromToken(token)
  }

  static combine(it: PeekTokenIterator, funcA: Function, funcB: Function) {
    if (!it.hasNext()) return null;
    const a: ASTNode = funcA();
    if (a === null) {
      return it.hasNext() ? funcB() : null;
    }
    const b: ASTNode = it.hasNext() ? funcB() : null;
    // a 和 b 都是存在，则新建一个Expr节点，然后a和b作为其子节点
    // 简单理解 a = 1, b = + 2
    // 新建一个 + 的节点 作为 1 和 2 的父节点
    const expr = Expr.fromToken(b.getLexeme(), ASTNodeTypes.BINARY_EXPR);
    expr.addChild(a);
    expr.addChild(b.getChild(0));
    return expr;
  }
  static race(it: PeekTokenIterator, funcA: Function, funcB: Function) {
    if (!it.hasNext()) return null;
    // 还有流，要么 funcA 吃，要么 funcB 吃
    const a = funcA();
    if (a === null) {
      return funcB();
    }
    return a;
  }
}

export default Expr;
