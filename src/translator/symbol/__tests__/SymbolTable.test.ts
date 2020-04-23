import SymbolTable from '../SymbolTable'
import Token from '../../../lexer/Token';
import TokenTypes from '../../../lexer/TokenTypes';
import { assert } from 'chai'

describe('SymbolTable', () => {
  it('basic', () => {
    const symbolTable = new SymbolTable()
    symbolTable.createLabel('L0', new Token(TokenTypes.VARIABLE, 'foo'))
    symbolTable.createVariable()
    symbolTable.createSymbolByLexeme(new Token(TokenTypes.VARIABLE, 'a'))
    assert.equal(symbolTable.localSize(), 2)
  });

  it('chain', () => {
    const symbolTable = new SymbolTable()
    symbolTable.createSymbolByLexeme(new Token(TokenTypes.VARIABLE, 'a'))

    const childTable = new SymbolTable()
    symbolTable.addChild(childTable)

    const childchildTable = new SymbolTable()
    childTable.addChild(childchildTable)

    assert.isTrue(childTable.exists(new Token(TokenTypes.VARIABLE, 'a')))
    assert.isTrue(childchildTable.exists(new Token(TokenTypes.VARIABLE, 'a')))
  });
});