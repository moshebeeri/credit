import { Card } from "../card/card";
import { InsufficientFundsError } from "../errors/insufficient_funds_error";
import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";
import {Obligo} from "."
export class Issuer extends Obligo{
    private name: string;

    constructor(public readonly id: string, name: string, obligo: number = 0.0) {
        super(obligo)
        this.name = name;
    }

    get Name() {
        return this.name;
    }
    
    async request(card: Card, transaction: Transaction): Promise<Authorization> {
        //check card exp 
        const exp = new Date(2000 + parseInt(card.expYear), parseInt(card.expMonth));

        const result = new Promise<Authorization>((resolve, reject) => {
            if (new Date > exp)
                return reject('expired card')
            //check obligo
            if (super.withdraw(transaction))
                return resolve(new Authorization())
            return reject('insufficient funds error')
        })
        return result
      }
}