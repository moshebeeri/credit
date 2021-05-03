import { Parameter } from "./parameter";

interface Profile {
  name: string
  parameters: [Parameter]
  values: {[name:string]: any}
  match(profile: Profile): Promise<boolean>
}

class HolderProfile implements Profile {
  constructor(public readonly name: string,
    readonly parameters: [Parameter],
    readonly values: { [name: string]: any}
  ) { }
  
  async match(profile: Profile): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

    })
  }
}

class IssuerProfile implements Profile {
  constructor(public readonly name: string,
    readonly parameters: [Parameter],
    readonly values: { [name: string]: any}
  ) { }
  
  async match(profile: Profile): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

    })
  }
}

export {Profile, HolderProfile, IssuerProfile}