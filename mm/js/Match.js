//MatchedKit, MatchedName, MatchedEmail, LargestSeg, TotalCM, Gen, LargestXSeg, TotalXCM, Overlap, CreatedDate, TestCompany
export class Match {
    constructor(kit, name, email, largestSegment, totalCentimorgans, generations, largestXSegment, totalXCentimorgans, overlap, createdDate, company) {
        this.kit = kit;
        this.name = name;
        this.email = email;
        this.largestSeg = largestSegment;
        this.totalCm = totalCentimorgans;
        this.generations = generations;
        this.largestXSeg = largestXSegment;
        this.totalXCm = totalXCentimorgans;
        this.overlap = overlap;
        this.created = createdDate;
        this.company = company;
    }
    get Kit() { return this.kit; }
    get Name() { return this.name; }
    get Email() { return this.email; }
    get LargestAutosomalSegment() { return this.largestSeg; }
    get TotalCentimorgan() { return this.totalCm; }
    get Generations() { return this.generations; }
    get LargestXSegment() { return this.largestXSeg; }
    get TotalXCentimorgans() { return this.totalXCm; }
    get Overlap() { return this.overlap; }
    get DateCreated() { return this.created; }
    get TestingCompany() { return this.company; }
}
