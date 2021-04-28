import { Acquirer } from '../acquirer/acquirer';
import { Network } from '../association/network';
import { Visa } from '../association/visa';
import { Card } from '../card/card';
import { Holder } from '../card/holder';
import { Issuer } from '../issuer/issuer';
import { Account } from '../merchant/account';
import { Merchant } from '../merchant/merchant';
import { Authorization } from '../payment/authorization';
import { Transaction } from '../payment/transaction';

export class System{
    private merchants = {} as { [id: string]: Merchant }
    private cards = {} as { [id: string]: Card }

    seed() {
        this.merchants = this.seedMerchants()
        this.cards = this.seedCards()
    }

    authorizationProcess(card: Card, transaction: Transaction): Authorization {
        return Authorization
    }

    clearing(): boolean {
        return false
    }

    statement(): boolean {
        return false
    }

    private seedMerchants(): { [id: string]: Merchant } {
        return {
            'business-1': new Merchant(
                'business-1',
                new Account('business-1', 'account-1'),
                new Acquirer('acquirer-business-1')
            )
        }
    }

    private seedCards(): { [id: string]: Card } {
        return {
            'card-1': new Card(
                new Visa('Platinum'),
                new Issuer('Issuer-1', 1000000),
                new Holder('holder-1', 'ssn-1', 'holder-1')
            )
        }
    }

    public get getMerchants() {
        return this.merchants;
    }
    
    public get getCards() {
        return this.cards;
    }

}