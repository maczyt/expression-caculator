import TAInstruction from "./TAInstruction";
import StaticSymbolTable from "./symbol/StaticSymbolTable";
import TAInstructionType from "./TAInstructionType";
import SymbolTable from "./symbol/SymbolTable";
import SymbolType from "./symbol/SymbolType";

class TAProgram {
  instructions: Array<TAInstruction>
  labelCount: number
  staticSymbolTable: StaticSymbolTable
  constructor() {
    this.instructions = []
    this.labelCount = 0
    this.staticSymbolTable = new StaticSymbolTable()
  }

  add(instruction: TAInstruction) {
    this.instructions.push(instruction)
  }

  addLabel() {
    const label = `L${this.labelCount ++}`
    const instruction = new TAInstruction(TAInstructionType.LABEL, null, null, label, null)
    this.add(instruction)
    return instruction
  }

  setStaticSymbols(symbolTable: SymbolTable) {
    for (const symbol of symbolTable.getSymbols()) {
      if (symbol.type === SymbolType.IMMEDIATE) {
        this.staticSymbolTable.add(symbol)
      }
    }
    for (const child of symbolTable.getChildren()) {
      this.setStaticSymbols(child)
    }
  }

  toString() {
    return this.instructions.map(x => {
      const s = x.toString()
      return s
    }).join('\n')
  }
}

export default TAProgram