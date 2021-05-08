import { assert, expect } from 'chai';
import { binding, given, then, when} from 'cucumber-tsflow';
import { Visa } from '../src/association/visa';
import { Card } from '../src/card/card';
import { Holder } from '../src/card/holder';
import { Issuer, IssuersPool, SingleIssuer } from '../src/issuer';
import { Merchant } from '../src/merchant/merchant';
import { CardTransaction } from '../src/payment/transaction';
import { GreaterThanOrEquals, HolderProfile, IssuerProfile,  Parameter, Profile, Value } from '../src/profile';
import { System } from '../src/system';

@binding()
export class IssuersPoolTest {
  system: System
  pool = {} as IssuersPool
  issuer = {} as Issuer
  profile = {} as Profile
  holderProfile = {} as HolderProfile
  holder = {} as Holder
  card = {} as Card

  constructor() {
    this.system = new System()
    this.system.seed()
  }

  @given(/you have initialized system and pool with profile/)
  public async initialize() {
    this.profile = new IssuerProfile('Min Score', [new GreaterThanOrEquals(600)])
    this.pool = new IssuersPool('pool-1-id', 'pool-1', this.profile)
    assert.equal(this.pool.getObligo, 0)
  }

  @given(/you added issuer to the pool/)
  public addIssuer() {
    this.issuer = new SingleIssuer('issuer-1', 'Issuer-1', 2000)
    this.pool.addIssuer(this.issuer, 1000)
    assert.equal(this.pool.getObligo, 1000)

  }

  @given(/an holder holding a card with a matching profile/)
  public holderWithProfile() {
    this.holderProfile = new HolderProfile('fico', [new Value(650) ] )
    this.holder = new Holder('holder-id-1', 'holder-ssn-1', 'holder-name-1', this.holderProfile)
    this.card = new Card(new Visa('Platinum'), this.holder)
    this.card.setIssuer = this.pool
    assert.equal(this.card.obligo.getObligo, 0)
  }

  @given(/you allocate obligo to card and holder from pool by amount of \$(\d+)/)
  public allocateObligo(obligo: number) {
    this.pool.addCard(this.card, obligo)
    assert.equal(this.card.obligo.getObligo, obligo)
  }

  @when(/you should charge the card by \$(\d+)/)
  public async firstCharge(amount: number) {
    const merchant: Merchant = this.system.getMerchants['business-1']
    const auth = await this.card.network.request(this.card, new CardTransaction().create(this.card, merchant, amount))
    assert.isNotNull(auth)
  }

  @then(/you should have \$(\d+) left obligo/)
  public validate(left: number) {
    assert.equal(this.card.obligo.getObligo, left)
  }
  
  @then(/another charge for \$(\d+) should fail/)
  public async secondCharge(amount: number) {
    const merchant: Merchant = this.system.getMerchants['business-1']
    let t = new CardTransaction().create(this.card, merchant, amount)
    try {
      const auth = await this.card.issuer.request(this.card, t)
      assert(false)
    } catch (e) {
      assert.equal(e, 'insufficient funds error')
    }
  }
}
