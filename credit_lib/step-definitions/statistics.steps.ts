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

  @then(/you should calculate z-order/)
  public calculateZOrder() {
    // zScore(x: number, mean: number, standardDeviation: number): number
    assert.equal(s.zScore(78, 80, 5), -0.4)
    s.cumulativeStdNormalProbability(s.zScore(80, this.mean, this.stddev))
    const z: number = s.probit(0.5)
    const x = this.x(z)
    console.log(x)
    assert.equal(s.cumulativeStdNormalProbability(-1.22), 0.1112)
    
  }

}