import Token from '../Token'
import TokenTypes from '../TokenTypes';
import { assert } from 'chai'

describe('Token', () => {
  it('getType', () => {
    const token = new Token(TokenTypes.NUMBER, '12')
    assert.equal(token.getType(), TokenTypes.NUMBER)
    assert.notEqual(token.getType(), TokenTypes.BRACKET)
  });

  it('getValue', () => {
    const token = new Token(TokenTypes.OPERATOR, '+')
    assert.equal(token.getValue(), '+')
  });
});