import TSymbol from "./Symbol"
import Token from "../../lexer/Token"
import TokenTypes from "../../lexer/TokenTypes"

class SymbolTable {
  parent: SymbolTable
  children: Array<SymbolTable>
  symbols: Array<TSymbol>
  tempIndex: number
  offsetIndex: number
  level: number
  constructor() {
    this.parent = null
    this.children = []
    this.symbols = []
    this.tempIndex = 0
    this.offsetIndex = 0
    this.level = 0
  }

  addSymbol(symbol: TSymbol) {
    this.symbols.push(symbol)
    symbol.setParent(this)
  }

  addChild(child: SymbolTable) {
    child.parent = this
    child.level = this.level + 1
    this.children.push(child)
  }

  getSymbols() {
    return this.symbols
  }
  getChildren() {
    return this.children
  }
  
  createLabel(label: string, lexeme: Token) {
    const labelSymbol = TSymbol.createLabel(label, lexeme)
    this.addSymbol(labelSymbol)
    return labelSymbol
  }
  createVariable() {
    const lexeme = new Token(TokenTypes.VARIABLE, `p${this.tempIndex++}`)
    const symbol = TSymbol.createAddress(lexeme, this.offsetIndex++)
    this.addSymbol(symbol)
    return symbol
  }

  exists(lexeme: Token) {
    const symbol = this.symbols.find(x => x.lexeme.getValue() === lexeme.getValue())
    if (symbol) return true
    if (this.parent !== null) {
      return this.parent.exists(lexeme)
    }
    return false
  }

  cloneFromSymbolTree(lexeme: Token, layerOffset: number) {
    let symbol: TSymbol = this.symbols.find(x => x.lexeme.getValue() === lexeme.getValue())
    if (symbol) {
      symbol = symbol.copy()
      symbol.layerOffset = layerOffset
      return symbol
    }
    if (this.parent !== null) {
      return this.parent.cloneFromSymbolTree(lexeme, layerOffset + 1)
    }
    return null
  }

  createSymbolByLexeme(lexeme: Token): TSymbol {
    let symbol = null
    if (lexeme.isScalar()) {
      symbol = TSymbol.createImmdiate(lexeme)
    } else {
      symbol = this.cloneFromSymbolTree(lexeme, 0)
      if (symbol === null) {
        symbol = TSymbol.createAddress(lexeme, this.offsetIndex ++) // 增加一个变量offset
      }
    }
    this.addSymbol(symbol)
    return symbol
  }

  localSize() {
    return this.offsetIndex
  }
}

export default SymbolTable