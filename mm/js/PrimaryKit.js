//PrimaryKit, PrimaryName, PrimaryEmail, MatchedKit, MatchedName, MatchedEmail, LargestSeg, TotalCM, Gen, LargestXSeg, TotalXCM, Overlap, CreatedDate, TestCompany
export class PrimaryKit {
    constructor(kit, name, email) {
        this.kit = kit;
        this.name = name;
        this.email = email;
    }
    get Kit() {
        return this.kit;
    }
    get Name() {
        return this.name;
    }
    get Email() {
        return this.email;
    }
}
