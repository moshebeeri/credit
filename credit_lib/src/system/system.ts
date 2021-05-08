import { Acquirer } from '../acquirer/acquirer'
import { Visa } from '../association/visa'
import { Card } from '../card/card'
import { Holder } from '../card/holder'
import { Account, AccountType } from '../account'
import { Merchant } from '../merchant/merchant'
import { Authorization, Transaction } from '../payment'
import { Obligo, SingleIssuer } from '../issuer'

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
                new Account('business-1', 'business-1', 'USD', AccountType.Merchant),
                new Acquirer('acquirer-business-1')
            )
        }
    }

    private seedCards(): { [id: string]: Card } {
        let issuer = new SingleIssuer('Issuer-1', 'Issuer-1', 1000000)
        let card = new Card(
            new Visa('Platinum'),
            new Holder('holder-1', 'ssn-1', 'holder-1')
        )
        card.setIssuer = issuer
        card.setObligo = new Obligo(100)
        return {
            'card-1': card
        }
    }

    public get getMerchants() {
        return this.merchants;
    }
    
    public get getCards() {
        return this.cards;
    }

}