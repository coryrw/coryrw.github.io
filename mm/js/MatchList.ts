export class MatchList {
  //PrimaryKit, PrimaryName, PrimaryEmail

  private kit: string;
  private name: string;
  private email: string;

  constructor(number: string, name: string, email: string) {
    this.kit = number;
    this.name = name;
    this.email = email;
  }

  
  public get Number() : string {
    return this.kit;
  }
  
  public get Name() : string {
    return this.kit;
  }
}