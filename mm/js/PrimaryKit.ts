//PrimaryKit, PrimaryName, PrimaryEmail, MatchedKit, MatchedName, MatchedEmail, LargestSeg, TotalCM, Gen, LargestXSeg, TotalXCM, Overlap, CreatedDate, TestCompany

export class PrimaryKit {
  private kit: string;
  private name: string;
  private email: string;

  constructor(kit : string, name: string, email: string) {
    this.kit = kit; this.name = name; this.email = email;
  }

  public get Kit() : string {
    return this.kit;
  }
  
  public get Name() : string {
    return this.name;
  }
  
  public get Email() : string {
    return this.email;
  }
}