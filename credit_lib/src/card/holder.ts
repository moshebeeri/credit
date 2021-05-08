import { Profile } from "../profile";

export class Holder {
    constructor(
        public readonly id: string,
        public readonly ssn: string,
        public readonly name: string,
        private profile = {} as Profile
    ) {

    }

    updateProfile(profile: Profile) {
        this.profile = profile
    }

}