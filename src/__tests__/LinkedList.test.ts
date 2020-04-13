import LinkedList from '../LinkedList'
import { assert } from 'chai'

describe('LinkedList', () => {
  it('basic', () => {
    const list = new LinkedList()
    assert.equal(list.length, 0)
    assert.instanceOf(list, Array)
  });

  it('head', () => {
    const list = new LinkedList(1)
    assert.equal(list.head, 1)
  });

  it('tail', () => {
    const list = new LinkedList(1, 2)
    assert.equal(list.tail, 2)
  });
});