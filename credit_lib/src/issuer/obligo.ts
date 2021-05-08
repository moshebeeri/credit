import { InsufficientFundsError } from "../errors/insufficient_funds_error";
import { Transaction } from "../payment/transaction";

export class Obligo{
    protected obligo: number;

    constructor(obligo: number = 0.0){
        this.obligo = obligo;
    }
    
    releaseObligo(amount: number){
        this.obligo += amount;
    }

    useObligo(amount: number): number{
        if(this.obligo >= amount){
            this.obligo -= amount;
        } else {
            throw new InsufficientFundsError()
        }
        return this.obligo;
    }

    addObligo(amount: number){
        this.obligo += amount;
    }

    set setObligo(amount: number){
        this.obligo = amount;
    }

    get getObligo() {
        return this.obligo
    }

    async withdraw(transaction: Transaction): Promise<number> {
        const result = new Promise<number>((resolve, reject) => {
            //check obligo
            if (this.obligo < transaction.amount)
                return reject('insufficient funds error')
            this.useObligo(transaction.amount)
            resolve(this.obligo)
        })
        return result
    }
    
    cavWithdraw(transaction: Transaction): boolean {
        if (this.obligo < transaction.amount)
         return false
        return true
      }

}