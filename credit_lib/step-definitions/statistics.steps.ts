import { binding, given, then, when} from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import * as s from 'simple-statistics'

@binding()
export class StatisticsSteps {
  data: Array<number> = []
  stddev: number = 0
  mean: number = 0

  @given(/you have initialized some statistics/)
  public createCard() {
    this.data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    this.stddev = s.standardDeviation(this.data)
    this.mean = s.mean(this.data)
  }

  x(z: number): number {
    return z*this.stddev + this.mean
  }

  @then(/you should calculate percentile value/)
  public percentileValue() {
    const z: number = s.probit(0.5)
    const x = this.x(z)
    assert.equal(x, 55)    
  }

}