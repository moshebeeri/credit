import { Card } from "../card";
import { Authorization } from "../payment/authorization";
import { Transaction } from "../payment/transaction";
import { Obligo } from "./"
export interface Issuer {
    id: string
    obligo: Obligo
    request(card: Card, transaction: Transaction): Promise<Authorization> 
}