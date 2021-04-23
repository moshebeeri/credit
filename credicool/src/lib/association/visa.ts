import { Network } from "./network";

export class Visa extends Network{
  constructor(public readonly name: String, public readonly type: string) {
    super(name, type)
  }
}
