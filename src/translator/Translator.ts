import ASTNode from "../parser/astNode/ASTNode";
import TAProgram from "./TAProgram";
import SymbolTable from "./symbol/SymbolTable";
import ASTNodeTypes from "../parser/astNode/ASTNodeTypes";
import TAInstruction from "./TAInstruction";
import TAInstructionType from "./TAInstructionType";
import Expr from "../parser/astNode/Expr";

class Translator {
  translate(astNode: ASTNode) {
    const program = new TAProgram()
    const symbolTable = new SymbolTable()
    this.translateExpr(program, astNode, symbolTable)
    program.setStaticSymbols(symbolTable)
    return program
  }

  /**
   * SDD 产生式
   * E -> E1 op E2
   * E -> F
   *  E.addr = createSymbol(F.lexeme)
   * @param program 
   * @param node 
   * @param symbolTable 
   */
  translateExpr(program: TAProgram, node: ASTNode, symbolTable: SymbolTable) {
    if (node.type === ASTNodeTypes.FACTOR) {
      const addr = symbolTable.createSymbolByLexeme(node.getLexeme())
      node.setProp('addr', addr)
      return addr
    } else if (node instanceof Expr) {
      for (const child of node.children) {
        this.translateExpr(program, child, symbolTable)
      }

      if (node.getProp('addr') === null) {
        node.setProp('addr', symbolTable.createVariable())
      }
      const instruction = new TAInstruction(
        TAInstructionType.ASSIGN, 
        node.getProp('addr'),
        node.getLexeme().getValue(),
        node.getChild(0).getProp('addr'),
        node.getChild(1).getProp('addr')
      )
      program.add(instruction)
      return instruction.result
    }
  }
}

export default Translator