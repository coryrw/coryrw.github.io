//MatchedKit, MatchedName, MatchedEmail, LargestSeg, TotalCM, Gen, LargestXSeg, TotalXCM, Overlap, CreatedDate, TestCompany

export class Match {
  private kit: string;
  private name: string;
  private email: string;
  private largestSeg: number;
  private totalCm: number;
  private generations: number;
  private largestXSeg: number;
  private totalXCm: number;
  private overlap: number;
  private created: string;
  private company: string;

  constructor(kit: string, name: string, email: string, largestSegment: number,
    totalCentimorgans: number, generations: number, largestXSegment: number,
    totalXCentimorgans: number, overlap: number, createdDate: string,
    company: string) {
    this.kit = kit; this.name = name; this.email = email; this.largestSeg = largestSegment;
    this.totalCm = totalCentimorgans; this.generations = generations; this.largestXSeg = largestXSegment;
    this.totalXCm = totalXCentimorgans; this.overlap = overlap; this.created = createdDate; this.company = company;
  }

  public get Kit() : string { return this.kit; }
  public get Name() : string { return this.name; }
  public get Email() : string { return this.email; }
  public get LargestAutosomalSegment() : number { return this.largestSeg; }
  public get TotalCentimorgan() : number { return this.totalCm; }
  public get Generations() : number { return this.generations; }
  public get LargestXSegment() : number { return this.largestXSeg; }
  public get TotalXCentimorgans() : number { return this.totalXCm; }
  public get Overlap() : number { return this.overlap; }
  public get DateCreated() : string { return this.created; }
  public get TestingCompany() : string { return this.company; }
}