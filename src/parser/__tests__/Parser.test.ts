import Parser from '../Parser'
import PeekIterator from '../../PeekIterator';
import arrayToGenerator from '../../arrayToGenerator';
import Lexer from '../../lexer/Lexer';
import PeekTokenIterator from '../../PeekTokenIterator';
import { assert, expect } from 'chai'

describe('Parser', () => {
  it('simple', () => {
    const it = new PeekIterator(arrayToGenerator([...'1+2+3+4']), '\0')
    const lexer = new Lexer()
    const tokens = lexer.analyse(it)
    const parser = new Parser()
    const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))
    const expr = parser.parse(tokensIt)
    assert.equal(expr.getLexeme().getValue(), '+')
    const v1 = expr.getChild(0)
    assert.equal(v1.getLexeme().getValue(), '1')
    const e2 = expr.getChild(1)
    assert.equal(e2.getLexeme().getValue(), '+')
    const v2 = e2.getChild(0)
    assert.equal(v2.getLexeme().getValue(), '2')
    const e3 = e2.getChild(1)
    assert.equal(e3.getLexeme().getValue(), '+')
    const v3 = e3.getChild(0)
    assert.equal(v3.getLexeme().getValue(), '3')
    const v4 = e3.getChild(1)
    assert.equal(v4.getLexeme().getValue(), '4')
    expr.print()
  });

  it('Test 2+3*3', () => {
    const it = new PeekIterator(arrayToGenerator([...'2+3*3']), '\0')
    const lexer = new Lexer()
    const tokens = lexer.analyse(it)
    const parser = new Parser()
    const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))
    const expr = parser.parse(tokensIt) 
    expr.print()
  })
  it('Test 2*(3+1)*3', () => {
    const it = new PeekIterator(arrayToGenerator([...'2*(3+1)*3']), '\0')
    const lexer = new Lexer()
    const tokens = lexer.analyse(it)
    const parser = new Parser()
    const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))
    const expr = parser.parse(tokensIt)
    expr.print()
  });

  it("Brackets must be paired", function () {
    const it = new PeekIterator(arrayToGenerator([...'1 + 2) * 3']), '\0')
    const lexer = new Lexer()
    const tokens = lexer.analyse(it)
    const parser = new Parser()
    const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))
    expect(() => parser.parse(tokensIt)).to.throw('Syntax error, Unexpected token )')
  });
});