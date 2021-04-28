import { Card } from "../card/card";
import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";

export class Network{
  constructor(public readonly name: String, public readonly type: string) {
  }

 async request(card: Card, transaction: Transaction): Promise<Authorization> {
    return await card.issuer.request(card, transaction)
  }

}