import { Parameter } from "./parameter";

interface Profile {
  name: string
  parameters: [Parameter]
  match(profile: Profile): Promise<boolean>
  // addParameter(parameter: Parameter): Profile
  // addValue(name: string, value: any): Profile
}

class HolderProfile implements Profile {
  constructor(public readonly name: string,
    readonly parameters: [Parameter]
  ) { }
  
  async match(profile: Profile): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

    })
  }
}

class IssuerProfile implements Profile {

  constructor(public readonly name: string,
    readonly parameters: [Parameter]
  ) { }
  
  async match(profile: Profile): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

    })
  }
}

export {Profile, HolderProfile, IssuerProfile}