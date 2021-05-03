import { Profile } from "../profile";



class Bucket {
  
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly currencySymbol: string,
    private amount: number,
    public readonly profile: Profile
  ) {

  }

  get balance() { return this.amount }

  add(amount: number): number {
    this.amount += amount
    return this.amount
  }

  transfer(amount: number, bucket: Bucket) {
    
  }


}