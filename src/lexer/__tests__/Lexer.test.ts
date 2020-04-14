import Lexer from '../Lexer'
import PeekIterator from '../../PeekIterator';
import arrayToGenerator from '../../arrayToGenerator';
import { assert } from 'chai'

describe('Lexer', () => {
  describe('analyse', () => {
    it('Test simple', () => {
      const it = new PeekIterator(arrayToGenerator([...' 63 - 69 - 46 + 57 ']))
      const lexer = new Lexer()
      const tokens = lexer.analyse(it)
      assert.equal(tokens.length, 7)
    })
    it('Test 2', () => {
      const it = new PeekIterator(arrayToGenerator([...' 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) ']))
      const lexer = new Lexer()
      const tokens = lexer.analyse(it)
      assert.equal(tokens.length, 15)
      assert.equal(tokens[3].getValue(), '*')
    });
  });
});