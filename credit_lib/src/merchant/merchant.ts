import { Acquirer } from "../acquirer/acquirer";
import { Card } from "../card/card";
import { Authorization } from "../payment/authorization";
import { Account } from "../account/account";

export class Merchant {
    constructor(public id: string,
        public account: Account,
        public acquirer: Acquirer) {
    }

    presentCard(card: Card,): Authorization{
        return {} as Authorization
    }
}