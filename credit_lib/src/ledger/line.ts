import {Account} from '../account'
import { Transaction } from '../payment/transaction'

enum Operation {
  Deposit = 1,
  Withdraw = 2,
}

class Line {  
  public readonly timestamp: number

  constructor(
    private readonly operation: Operation,
    private readonly transaction: Transaction,
  ) {
    this.timestamp = Date.now()
  }

  get toString(): string {
    const ts: string = new Date(this.timestamp).toISOString() 
    return ts + " " + this.operation.toString() + " " + this.transaction.toString()
  }

}

export {Line, Operation}