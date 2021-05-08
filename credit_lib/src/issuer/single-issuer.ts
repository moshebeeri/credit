import { Card } from "../card";
import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";
import { Issuer, Obligo } from "."

export class SingleIssuer implements Issuer {
    name: string;
    obligo: Obligo
    
    constructor(public readonly id: string, name: string, obligo: number = 0.0) {
        this.name = name;
        this.obligo = new Obligo(obligo)
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
            if(this.obligo.getObligo >= transaction.amount && card.obligo.getObligo>= transaction.amount)
                if (this.obligo.withdraw(transaction) && card.obligo.withdraw(transaction))
                    return resolve(new Authorization())
            return reject('insufficient funds error')
        })
        return result
      }
}