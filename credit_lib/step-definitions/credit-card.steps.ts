import { binding, given, then, when} from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import { Card } from '../src/card/card';
import { Holder } from '../src/card';
import { SingleIssuer } from '../src/issuer';
import { Visa } from '../src/association/visa';
import { System } from '../src/system';
import { Merchant } from '../src/merchant/merchant';
import { CardTransaction, Transaction } from '../src/payment/transaction';
import { Obligo } from '../src/issuer';

@binding()
export class BankAccountSteps {
  private card: Card = {} as Card
  private created: Date = {} as Date
  private system = new System()

  @given(/card been created for new client/)
  public createCard() {
    this.card =  new Card(
      new Visa('Platinum'),
      new Holder('holder-1', 'ssn-1', 'holder-1')
    )
    this.card.setIssuer = new SingleIssuer('Issuer-1', 'Issuer-1', 1000000)
    // this.card.setObligo = 1000
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
    this.system.getCards['card-1'].obligo.setObligo = balance
    expect(this.system.getCards['card-1'].obligo.getObligo).to.be.greaterThanOrEqual(balance)
  }

  // @then(/card charge for \$(\d+) should succeeded/)
  // public async charge1(amount: number) {
  //   assert.equal(amount, 100)
  //   const card: Card = this.system.getCards['card-1']
  //   const merchant: Merchant = this.system.getMerchants['business-1']
  //   const auth = await card.network.request(card, new CardTransaction().create(card, merchant, amount))
  //   assert.isNotNull(auth)
  // }

  @when(/card charge for \$(\d+) succeeded/)
  public async charge(amount: number) {
    assert.equal(amount, 100)
    const card: Card = this.system.getCards['card-1']
    const merchant: Merchant = this.system.getMerchants['business-1']
    const auth = await card.network.request(card, new CardTransaction().create(card, merchant, amount))
    assert.isNotNull(auth)
  }

  @then(/issuer obligo is \$(\d+)/)
  public async balance(amount: number) {
    const card: Card = this.system.getCards['card-1']
    const obligo: Obligo = card.obligo
    assert.equal(obligo.getObligo, 0) 
  }
}
