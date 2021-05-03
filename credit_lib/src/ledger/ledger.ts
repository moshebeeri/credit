import { Line } from "./line";

export class Ledger {
  ledger: { [timestamp: number]: Line } = {}
  constructor(private readonly id: string = '') {}
  add(line: Line) {
    this.ledger[line.timestamp] = line
  }

  sortedLedger(): Array<Line> {
    let keys = Object.keys(this.ledger).map((v) => parseInt(v))
    keys = keys.sort((a: number, b: number) => a - b)
    let ret: Array<Line> = []
    for (let index = 0; index < keys.length; index++) {
      const element = this.ledger[keys[index]]
      ret.push(element)
    }
    return ret
  }
}