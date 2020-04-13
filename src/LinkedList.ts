class LinkedList<T> extends Array<T> {
  constructor(...args: Array<T>) {
    // new LinkedList(1) -> new Array(1) & arr.push(1) -> [1]
    if (args.length === 1) {
      args.push(args[0])
    }
    super(...args)
  }

  get head() {
    return this[0] || null
  }
  get tail() {
    return this[this.length - 1] || null
  }
}

export default LinkedList