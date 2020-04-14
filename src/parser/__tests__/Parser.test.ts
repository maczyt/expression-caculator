import Parser from '../Parser'
import PeekIterator from '../../PeekIterator';
import arrayToGenerator from '../../arrayToGenerator';
import Lexer from '../../lexer/Lexer';
import Token from '../../lexer/Token';
import PeekTokenIterator from '../../PeekTokenIterator';

describe('Parser', () => {
  it('simple', () => {
    const it = new PeekIterator(arrayToGenerator([...'(1 + 2) * 3']), '\0')
    const lexer = new Lexer()
    const tokens = lexer.analyse(it)
    const parser = new Parser()
    const tokensIt = new PeekTokenIterator(arrayToGenerator(tokens))
    const ast = parser.parse(tokensIt)
    console.log('ast', ast)
  });
});