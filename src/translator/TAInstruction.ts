import TAInstructionType from "./TAInstructionType";

class TAInstruction {
  type: TAInstructionType
  result: any
  op: string
  arg1: any
  arg2: any

  constructor(type: TAInstructionType, result, op: string, arg1 = null, arg2 = null) {
    this.type = type
    this.result = result
    this.op = op
    this.arg1 = arg1
    this.arg2 = arg2
  }

  toString() {
    switch(this.type) {
      case TAInstructionType.ASSIGN:
        if (this.arg2 !== null) {
          return `${this.result} = ${this.arg1} ${this.op} ${this.arg2}`
        } else {
          return `${this.result} = ${this.arg1}`
        }
      case TAInstructionType.IF:
        return `IF ${this.arg1} ELSE ${this.arg2}`
      case TAInstructionType.GOTO:
        return `GOTO ${this.arg1}`
      case TAInstructionType.LABEL:
        return `${this.arg1}`
      case TAInstructionType.RETURN:
        return `RETURN ${this.arg1}`
      case TAInstructionType.PARAM:
        return `PARAM ${this.arg1} ${this.arg2}`
      case TAInstructionType.SP:
        return `SP ${this.arg1 }`
      case TAInstructionType.CALL:
        return `CALL ${this.arg1}`
    }
    throw new Error('Unknow TAInstructionType: ' + this.type)
  }
}

export default TAInstruction