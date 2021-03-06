import { Holder } from "../card/holder";


export class HolderObligo {
  private readonly used: number
  constructor(public readonly holder: Holder, private obligo: number) {
    this.used = 0
  }

  get getUsed(): number {
    return this.used
  }

  get getUnused(): number {
    return this.obligo - this.used
  }

  increaseObligo(obligo: number): number {
    this.obligo += obligo
    return this.obligo
  }

  decreaseObligo(obligo: number): number {
    if (obligo >= this.obligo)
      this.obligo = 0
    else
      this.obligo -= obligo
    return this.obligo
  }

  get getObligo(): number {
    return this.obligo
  }

}