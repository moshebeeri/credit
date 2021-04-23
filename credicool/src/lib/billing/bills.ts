import { Bil } from './bil'

export class Bills{
    holderBills: { [holderId: string]: Bil } = {};
}