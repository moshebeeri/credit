import { Card } from "../card/card";
import { InsufficientFundsError } from "../errors/insufficient_funds_error";
import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";

export class Issuer{
    private name: string;
    private obligo: number;

    constructor(name: string, obligo: number = 0.0){
        this.name = name;
        this.obligo = obligo;
    }

    get Name() {
        return this.name;
    }
    
    releaseObligo(amount: number){
        this.obligo += amount;
    }

    useObligo(amount: number): number{
        if(this.obligo - amount >=0 ){
            this.obligo -= amount;
        } else {
            throw new InsufficientFundsError()
        }
        return this.obligo;
    }

    addObligo(amount: number){
        this.obligo += amount;
    }

    setObligo(amount: number){
        this.obligo = amount;
    }

    get getObligo() {
        return this.obligo
    }

    async request(card: Card, transaction: Transaction): Promise<Authorization> {
        //check card exp 
        const exp = new Date(2000 + parseInt(card.expYear), parseInt(card.expMonth));

        const result = new Promise<Authorization>((resolve, reject) => {
            if (new Date > exp)
                return reject('expired card')
            //check obligo
            if (this.obligo < transaction.amount)
                return reject('insufficient funds error')
            this.useObligo(transaction.amount)
            resolve(new Authorization())
        })
        return result
      }
}