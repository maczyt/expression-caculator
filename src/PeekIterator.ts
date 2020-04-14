import LinkedList from "./LinkedList"

const CACHE_SIZE = 5
class PeekIterator<T=string> {
  private it: Generator<T>
  // 流的结束标志位
  private endToken: T | string
  // 被吃过但是未被吃掉的流
  private stackPutBacks: LinkedList<T>
  // 缓存某个长度的最新吃掉的流
  private queuCache: LinkedList<T>
  constructor(it: Generator<T>, endToken = '') {
    this.it = it
    this.endToken = endToken
    this.stackPutBacks = new LinkedList()
    this.queuCache = new LinkedList()
  }

  /**
   * 从流中吃流单元、流有两个来源，一个是源代码的流（字符流），
   * 另一个是未被吃掉的流（存储在stackPutBacks中） 是因为我们需要执行 look a head 等操作
   * 所以我们吃流应该从stackPutBacks中优先s
   * @returns {T}
   * @memberof PeekIterator
   */
  next(): T {
    let val = null
    if (this.stackPutBacks.length > 0) {
      val = this.stackPutBacks.pop()
    } else {
      const state = this.it.next()
      val = state.value
      // 这里可能字符流已经没了
      if (state.done) {
        const tmp = this.endToken
        val = tmp
        this.endToken = null
      }
    }
    // 吃流 需要缓存
    while (this.queuCache.length >= CACHE_SIZE) {
      this.queuCache.shift()
    }
    this.queuCache.push(val)
    return val
  }
  /**
   * 这个就是 look a head 操作了
   * 1. 从字符流中吃掉一个流 (如果stackPutBacks中有流，直接通过指针tail来访问)
   * 2. 再把流存储到stackPutBacks中
   * @returns {T}
   * @memberof PeekIterator
   */
  peek(): T {
    if (this.stackPutBacks.length > 0) {
      return this.stackPutBacks.tail
    }
    const val = this.next()
    this.putBack()
    return val
  }
  /**
   * 因为最新吃了的流会被缓存
   * 由于操作了peek操作，这个时候流被吃了，但是需要再把该流取回到stackPutBacks中
   * @memberof PeekIterator
   */
  putBack(): void {
    if (this.queuCache.length > 0) {
      this.stackPutBacks.push(this.queuCache.pop())
    }
  }
  /**
   * 是否还有可吃的流
   * 一直吃到终止符
   * @returns {boolean}
   * @memberof PeekIterator
   */
  hasNext(): boolean {
    return !!this.endToken || !!this.peek()
  }
}

export default PeekIterator