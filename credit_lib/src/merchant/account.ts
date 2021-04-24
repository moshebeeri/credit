export class Account {
    id: string
    merchant_id: string
    constructor(merchant_id: string, id: string){
        this.id = id
        this.merchant_id = merchant_id
    }
}