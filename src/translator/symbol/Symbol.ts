import Token from "../../lexer/Token"
import SymbolType from "./SymbolType"

class TSymbol {
  type: SymbolType // 类型
  label: string
  offset: number // 偏移量
  layerOffset: number
  lexeme: Token
  parent: any
  constructor(type: SymbolType) {
    this.type = type
    this.label = null
    this.offset = 0
    this.layerOffset = 0
    this.lexeme = null
    this.parent = null
  }

  static createAddress(lexeme: Token, offset: number) {
    const symbol = new TSymbol(SymbolType.ADDRESS)
    symbol.lexeme = lexeme
    symbol.offset = offset
    return symbol
  }

  static createImmdiate(lexeme: Token) {
    const symbol = new TSymbol(SymbolType.IMMEDIATE)
    symbol.lexeme = lexeme
    return symbol
  }

  static createLabel(label: string, lexeme: Token) {
    const symbol = new TSymbol(SymbolType.LABEL)
    symbol.label = label
    symbol.lexeme = lexeme
    return symbol
  }

  copy() {
    const symbol = new TSymbol(this.type)
    symbol.label = this.label
    symbol.layerOffset = this.layerOffset
    symbol.lexeme = this.lexeme
    symbol.offset = this.offset
    symbol.parent = this.parent
    return symbol
  }

  setParent(parent) {
    this.parent = parent
  }

  toString() {
    if (this.type === SymbolType.LABEL) {
      return this.label
    }
    return this.lexeme.getValue()
  }
}

export default TSymbol