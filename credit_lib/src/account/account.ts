import { Ledger } from "../ledger"

enum AccountType {
  Issuer    = 1,
  Issuers   = 2,
  Merchant  = 3,
  Holder    = 4,
  Network   = 5,
  Affiliate = 6
  }
  
class Account {
  accountLedger: Ledger
  constructor(
    public readonly id: string,
    private readonly userId: string,
    public readonly currency: string,
    private readonly type: AccountType) {
        this.accountLedger = new Ledger()
  }
  get leger() {
    return this.accountLedger
}
}

export { Account, AccountType }