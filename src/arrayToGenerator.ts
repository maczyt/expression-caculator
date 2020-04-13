function* arrayToGenerator<T>(arr: Array<T>) {
  for (let item of arr) {
    yield item
  }
}

export default arrayToGenerator