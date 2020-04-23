import TSymbol from "./Symbol";

class StaticSymbolTable {
  symbols: Array<TSymbol>
  offsetMap: Map<string, TSymbol>
  offsetCounter: number
  constructor() {
    this.symbols = []
    this.offsetMap = new Map()
    this.offsetCounter = 0
  }

  add(symbol: TSymbol) {
    const lexval = symbol.lexeme.getValue()
    if (!this.offsetMap.has(lexval)) {
      this.offsetMap.set(lexval, symbol)
      symbol.offset = this.offsetCounter ++
      this.symbols.push(symbol)
    } else {
      const sameSymbol = this.offsetMap.get(lexval)
      symbol.offset = sameSymbol.offset
    }
  }

  size() {
    return this.symbols.length
  }
}

export default StaticSymbolTable