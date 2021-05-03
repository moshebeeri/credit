import { binding, given, then, when} from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import { Card } from '../src/card/card';
import { Holder } from '../src/card/holder';
import { Issuer } from '../src/issuer/issuer';
import { Visa } from '../src/association/visa';
import { System } from '../src/system';
import { Merchant } from '../src/merchant/merchant';
import { CardTransaction, Transaction } from '../src/payment/transaction';

@binding()
export class BankAccountSteps {
  private card: Card = {} as Card
  private created: Date = {} as Date
  private system = new System()

  @given(/card been created for new client/)
  public createCard() {
    this.card =  new Card(
      new Visa('Platinum'),
      new Issuer('Issuer-1', 1000000),
      new Holder('holder-1', 'ssn-1', 'holder-1')
    )
    this.created = new Date()
  }

  @then(/card expiration year in (\d+)/)
  public expirationDateShouldBeValid(delayed: number) {
    const year = this.created.getFullYear()
    const expYear: number = parseInt(this.card.expYear)
    const should_be: number = year - 2000 + delayed
    assert.equal(expYear, should_be);
  }

  @given(/a system created for the card/)
  public seedSystem() {
    this.system.seed()
    assert.isNotEmpty(this.system.getMerchants)
    assert.isNotEmpty(this.system.getCards)
  }

  @given(/issuer with balance of \$(\d+)/)
  public updateIssuerBalance(balance: number) {
    this.system.getCards['card-1'].issuer.setObligo(balance)
    expect(this.system.getCards['card-1'].issuer.getObligo).to.be.greaterThanOrEqual(balance)
  }

  @then(/card charge for \$(\d+) should succeeded/)
  public async charge(amount: number) {
    assert.equal(amount, 100)
    const card: Card = this.system.getCards['card-1']
    const merchant: Merchant = this.system.getMerchants['business-1']
    const auth = await card.network.request(card, new CardTransaction().create(card, merchant, amount))
    assert.isNotNull(auth)
  }
}
