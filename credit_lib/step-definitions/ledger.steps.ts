import { assert, expect } from 'chai';
import { binding, given, then, when} from 'cucumber-tsflow';
import { Account, AccountType } from '../src/account';
import { Ledger, Line, Operation } from '../src/ledger'
import { Transaction, AccountTransaction } from '../src/payment/transaction';
import { System } from '../src/system';

class Point {
  constructor(
  public fromAccount: Account,
  public toAccount: Account,
  public transaction: Transaction,
  public line: Line){}
}


@binding()
export class LedgerSteps {
  ledger: Ledger
  system: System
  points: Point[] = []
  numberOfLines = 5

  constructor() {
    this.system = new System()
    this.system.seed()
    this.ledger = new Ledger('ledger-1')

  }

  // async delay(ms: number): Promise<void> {
  //    new Promise(resolve => setTimeout(()=>resolve, ms))
  // }
  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  @given(/you have initialized transactions/)
  public async createLines() {
    for (let i = 1; i < this.numberOfLines+1; i++) {
      let fromAccount: Account = new Account('account-1-'+i, 'user-1-'+i, 'USD', AccountType.Issuer)
      let toAccount: Account = new Account('account-2-'+i, 'user-2-'+i, 'USD', AccountType.Issuers)
      let transaction: Transaction = new AccountTransaction().create(fromAccount, toAccount, 100+i)
      let line: Line = new Line(Operation.Deposit, transaction)
     const point = new Point(
        fromAccount,
        toAccount,
        transaction,
        line
      )
      this.points.push(point)
      await this.delay(50) //.then(()=>{});
    }
    const shuffle = (arr: Point[]) => {
      const newArr = arr.slice()
      for (let i = newArr.length - 1; i > 0; i--) {
          const rand = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      return newArr
    }
    this.points = shuffle(this.points)
    assert.equal(this.points.length, this.numberOfLines)
  }

  @then(/you should add the lines to the ledger/)
  public addToLedger() {
    this.points.forEach(point => this.ledger.add(point.line))
    assert.equal(Object.keys( this.ledger.ledger ).length, this.numberOfLines)
  }

  @then(/you should retrieve the ledger transactions sorted/)
  public retrieveSorted() {
    let previous: number = 0
    assert.equal(this.ledger.sortedLedger().length, this.numberOfLines)
    this.ledger.sortedLedger().forEach((line) => {
      expect(line.timestamp).to.be.greaterThanOrEqual(previous)
      previous = line.timestamp
    })
  }
}
