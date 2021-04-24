import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";

// also known as merchant processing bank
export class Acquirer{
  constructor(public readonly name: string){}
  processTransaction(transaction: Transaction): Authorization {
    return {} as Authorization
  }
}