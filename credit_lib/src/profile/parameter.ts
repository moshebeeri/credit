import * as s from 'simple-statistics'

interface Parameter{
  match(value: any): boolean
}

class Between implements Parameter {
  constructor(private min: number, private max: number) {}
  match(value: number): boolean {
    return this.min <= value && value >= this.max
  }
}

class GreaterThanOrEquals implements Parameter {
  constructor(private val: number) {}
  match(from: number): boolean {
    return this.val >= from
  }
}

class Equals implements Parameter {
  constructor(private val: number) {}
  match(val: number): boolean {
    return this.val == val
  }
}

class Value implements Parameter {
  constructor(private val: number) {}
  match(val: number): boolean {
    return this.val == val
  }
}

class Name implements Parameter {
  constructor(private name: string) {}
  match(match: string): boolean {
    return this.name == match
  }
}

class Percentile implements Parameter {
  constructor(private percentile: number, private mean: number, private stddev: number) { }
  private x = (z: number): number => z*this.stddev + this.mean

  match(value: number): boolean {
    const z: number = s.probit(this.percentile)
    const x = this.x(z)
    return value>=x
  }
}

export {
  Parameter, Name, Between, GreaterThanOrEquals, Equals, Value, Percentile
}