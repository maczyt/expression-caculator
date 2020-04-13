import PeekIterator from '../PeekIterator'
import arrayToGenerator from '../arrayToGenerator'
import { expect } from 'chai'

describe('PeekIterator', () => {
  it('next', () => {
    const it = new PeekIterator<string>(arrayToGenerator([...'12345']))
    expect(it.next()).to.equal('1')
    it.next()
    it.next()
    expect(it.next()).to.equal('4')
    expect(it.hasNext()).to.true
    expect(it.next()).to.equal('5')
    expect(it.hasNext()).to.false
  });

  it('peek', () => {
    const it = new PeekIterator<string>(arrayToGenerator([...'123']))
    expect(it.peek()).to.equal('1')
    expect(it.peek()).to.equal('1')
    expect(it.peek()).to.equal('1')
    it.next()
    expect(it.peek()).to.equal('2')
    expect(it.peek()).to.equal('2')
    it.putBack()
    expect(it.peek()).to.equal('1')
  })
});