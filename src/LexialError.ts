class LexialError extends Error {
  constructor(msg: string) {
    super(msg)
  }
  
  static fromChar(ch) {
    return new LexialError(`Unexpected error ${ch}`)
  }
}

export default LexialError