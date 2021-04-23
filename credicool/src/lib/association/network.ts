import { Card } from "../card/card";
import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";

export class Network{
  constructor(public readonly name: String, public readonly type: string) {
  }

  request(card: Card, transaction: Transaction): Authorization {
    return card.issuer.request(card, transaction)
  }

}