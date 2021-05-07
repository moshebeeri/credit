import { Holder } from "../card/holder";
import { Profile } from "../profile";
import { Issuer } from "./issuer";
import { IssuerObligo, HolderObligo, Obligo } from ".";
import { AlreadyExistError, InsufficientFundsError } from "../errors";

export class IssuersPool extends Obligo{
  holders: { [holderId: string]: HolderObligo } = {}
  pool: { [issuerId: string]: IssuerObligo } = {}

  constructor(public readonly profile: Profile) {
    super(0)
  }

  addHolder(holder: Holder, obligo: number) {
    if (this.holders[holder.id])
      throw new AlreadyExistError('User with id ' + holder.id + ' already exist in this pool')
    try {
      this.useObligo(obligo)
      this.holders[holder.id] = new HolderObligo(holder, obligo)
    } catch (e) {
      throw new InsufficientFundsError('Insufficient obligo while adding holder ' + holder.id)
    }
  }

  increaseHolderObligo(holder: Holder, obligo: number) {
    this.useObligo(obligo)
    this.holders[holder.id].increaseObligo(obligo)  
  }

  decreaseHolderObligo(holder: Holder, obligo: number) {
    this.releaseObligo(obligo)
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
    this.addObligo(obligo)
    this.pool[issuer.id] = new IssuerObligo(issuer, obligo)
  }

  increaseIssuerObligo(issuer: Issuer, obligo: number) {
    this.addObligo(obligo)
    this.holders[issuer.id].increaseObligo(obligo)
  }

  decreaseIssuerObligo(issuer: Issuer, obligo: number) {
    this.addObligo(obligo)
    this.holders[issuer.id].increaseObligo(obligo)
  }

  removeIssuer(issuer: Issuer) {
    this.pool[issuer.id].increaseObligo(this.pool[issuer.id].getObligo)
    super.releaseObligo(this.pool[issuer.id].getObligo)
    delete this.pool[issuer.id]
  }
  
  getHIssuerObligo(issuer: Issuer) {
    return this.pool[issuer.id].getObligo
  }

  validate(): boolean {
    return false
  }

}