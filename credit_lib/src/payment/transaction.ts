import { Card } from "../card/card";
import { Merchant } from "../merchant/merchant";
import {Account} from "../account"

enum TransactionType {
    Card     = 1,
    Account  = 2,
    Charge   = 3,

}

interface Transaction{
    amount: number
    description: string
    type: TransactionType
    create(...args: any[]): Transaction
    toString(): string
}

class CardTransaction {
    description: string = ""
    type: TransactionType
    card = {} as Card
    merchant = {} as Merchant
    amount: number = 0
    constructor() {
        this.type  = TransactionType.Card
    }
        
    create(card: Card,
        merchant: Merchant, 
        amount: number,
        description: string = ""
    ) {
        this.card = card
        this.merchant = merchant
        this.amount = amount
        this.description = description
        return this
    }
}

class AccountTransaction {
    description: string = ""
    type: TransactionType
    from = {} as Account
    to = {} as Account
    amount: number = 0
    constructor() {
        this.type = TransactionType.Account
    }

    create(from: Account,
        to: Account, 
        amount: number,
        description: string = ""
    ) {
        this.from = from
        this.to = to
        this.amount = amount
        this.description = description
        return this
    }
}

export {Transaction, TransactionType, CardTransaction, AccountTransaction}