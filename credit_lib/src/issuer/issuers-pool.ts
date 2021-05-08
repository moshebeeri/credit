import { Card, Holder } from "../card";
import { Profile } from "../profile";
import { Issuer } from "./issuer";
import { IssuerObligo, HolderObligo, Obligo } from "./";
import { AlreadyExistError, InsufficientFundsError } from "../errors";
import { Authorization, Transaction } from "../payment";

export class IssuersPool implements Issuer{
  name: string;
  obligo: Obligo
  holders: { [holderId: string]: HolderObligo } = {}
  pool: { [issuerId: string]: IssuerObligo } = {}

  constructor(public readonly id: string, name: string, private readonly profile: Profile) {
    this.name = name;
    this.obligo = new Obligo(0)
  }

  get getName() {
      return this.name;
  }
  
  async request(card: Card, transaction: Transaction): Promise<Authorization> {
      //check card exp 
      const exp = new Date(2000 + parseInt(card.expYear), parseInt(card.expMonth));

      const result = new Promise<Authorization>((resolve, reject) => {
          if (new Date > exp)
              return reject('expired card')
          //check obligo
          if (this.obligo.withdraw(transaction))
              return resolve(new Authorization())
          return reject('insufficient funds error')
      })
      return result
    }

  addHolder(holder: Holder, obligo: number) {
    if (this.holders[holder.id])
      throw new AlreadyExistError('User with id ' + holder.id + ' already exist in this pool')
    try {
      this.obligo.useObligo(obligo)
      this.holders[holder.id] = new HolderObligo(holder, obligo)
    } catch (e) {
      throw new InsufficientFundsError('Insufficient obligo while adding holder ' + holder.id)
    }
  }

  increaseHolderObligo(holder: Holder, obligo: number) {
    this.obligo.useObligo(obligo)
    this.holders[holder.id].increaseObligo(obligo)  
  }

  decreaseHolderObligo(holder: Holder, obligo: number) {
    this.obligo.releaseObligo(obligo)
    this.holders[holder.id].decreaseObligo(obligo)
   }
  
  removeHolder(holder: Holder) {
    this.holders[holder.id].decreaseObligo(this.holders[holder.id].getObligo)
    delete this.holders[holder.id]
  }
  getHolderObligo(holder: Holder): number{
    return this.holders[holder.id].getObligo
  }
  
  addIssuer(issuer: Issuer, obligo: number) {
    if (this.pool[issuer.id])
      throw new AlreadyExistError('Issuer with id ' + issuer.id + ' already exist in this pool')
      this.obligo.addObligo(obligo)
    this.pool[issuer.id] = new IssuerObligo(issuer, obligo)
  }

  increaseIssuerObligo(issuer: Issuer, obligo: number) {
    this.obligo.addObligo(obligo)
    this.holders[issuer.id].increaseObligo(obligo)
  }

  decreaseIssuerObligo(issuer: Issuer, obligo: number) {
    this.obligo.addObligo(obligo)
    this.holders[issuer.id].increaseObligo(obligo)
  }

  removeIssuer(issuer: Issuer) {
    this.pool[issuer.id].increaseObligo(this.pool[issuer.id].getObligo)
    this.obligo.releaseObligo(this.pool[issuer.id].getObligo)
    delete this.pool[issuer.id]
  }
  
  getHIssuerObligo(issuer: Issuer) {
    return this.pool[issuer.id].getObligo
  }

  validate(): boolean {
    return false
  }

  get getObligo() {
    return this.obligo.getObligo
}
}