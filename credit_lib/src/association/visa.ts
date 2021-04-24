import { Network } from "./network";

export class Visa extends Network{
  constructor(public readonly type: string) {
    super('Visa', type)
  }
}
