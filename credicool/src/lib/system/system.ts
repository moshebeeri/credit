import { Acquirer } from "../acquirer/acquirer";
import { Card } from "../card/card";
import { Account } from "../merchant/account";
import { Merchant } from "../merchant/merchant";

export class System{
    private merchants = {} as { [id: string]: Merchant; };
    private cards = {} as { [id: string]: Card; };

    seed() {
        this.merchants = this.seedMerchants()
        this.cards = this.seedCards()
    }

    authorizationProcess(): boolean {
        return false
    }

    clearing(): boolean {
        return false
    }

    statement(): boolean {
        return false
    }

    private seedMerchants(): { [id: string]: Merchant; } {
        return {
            "business-1": new Merchant(
                "business-1",
                new Account("business-1", "account-1"),
                new Acquirer("acquirer-business-1")
            )
        }
    }

    private seedCards(): { [id: string]: Card; } {
        throw new Error('Function not implemented.');
    }

    public get getMerchants() {
        return this.merchants;
    }
    
    public get getCards() {
        return this.cards;
    }

}