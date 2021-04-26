import { binding, given, then, when} from 'cucumber-tsflow';
import { assert } from 'chai';
import { Card } from '../src/card/card';
import { Holder } from '../src/card/holder';
import { Issuer } from '../src/issuer/issuer';
import { Visa } from '../src/association/visa';

@binding()
export class BankAccountSteps {
  private card: Card = {} as Card
  private created: Date = {} as Date
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
  public accountBalanceShouldEqual(delayed: number) {
    const year = this.created.getFullYear()
    console.log(year)
    const expYear: number = parseInt(this.card.expYear)
    const should_be: number =year-2000+delayed
    assert.equal(expYear, should_be);
  }
}
