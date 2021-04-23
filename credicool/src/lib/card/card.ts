import { Issuer } from "../issuer/issuer";
import { Holder } from "./holder";

export class Card{
    number: string
    exp: Date;
    expMonth: string
    expYear: string
    cvv: string

    gen4 = () => {
        return Math.floor(Math.random() * 1000).toString()
    }

    constructor(public issuer: Issuer, public holder: Holder){
        this.cvv = ( '000' + Math.floor(Math.random() * 1000).toString()).substr(-3)
        this.number = this.gen4() + "-" + this.gen4() + "-" + this.gen4() + "-" + this.gen4()
        this.exp = new Date(new Date().setFullYear(new Date().getFullYear() + 5))
        this.expMonth = new Intl.DateTimeFormat('en-US', { month: '2-digit', }).format(this.exp)
        this.expYear = new Intl.DateTimeFormat('en-US', { year: '2-digit' }).format(this.exp)
     }
}