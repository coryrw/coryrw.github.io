import {CsvError, parse as parseCsv} from './csv-parse/index.js';
import { Match } from './Match.js';
import { PrimaryKit } from './PrimaryKit.js';

//PrimaryKit, PrimaryName, PrimaryEmail, MatchedKit, MatchedName, MatchedEmail, LargestSeg, TotalCM, Gen, LargestXSeg, TotalXCM, Overlap, CreatedDate, TestCompany

enum ProcessMatchFileError {
  None,
  CsvParseError,
  InvalidHeaderError,
  EmptyMatchesError,
}

const columnNames = [`PrimaryKit`, `PrimaryName`, `PrimaryEmail`, `MatchedKit`, `MatchedName`, `MatchedEmail`, `LargestSeg`,
                     `TotalCM`, `Gen`, `LargestXSeg`, `TotalXCM`, `Overlap`, `CreatedDate`, `TestCompany`];

export async function ProcessMatchFile(matchFile: string): Promise<ProcessMatchFileResult> {
  const processResult = new ProcessMatchFileResult();
  const matches: Match[] = [];

  const parsed = await TryParseCsv(matchFile);

  let parseSuccess = true;
  if (parsed.Error) {
    parseSuccess = false;
    console.log('ERROR PARSING CSV!');
  } else {
    console.log(`PARSED CSV`);
    console.log(parsed.Records[0]);
  }

  if (!parseSuccess) {
    processResult.Success = false;
    processResult.Error = ProcessMatchFileError.CsvParseError;
    return processResult;
  }

  let validHeader = true;
  
  if (parsed.Records[0].length == columnNames.length) {
    for (let i = 0; i < columnNames.length; i++) {
      if (!(columnNames[i] == parsed.Records[0][i].trim())) {
        validHeader = false;
        break;
      }
    }
  }
  
  if (!validHeader) {
    processResult.Success = false;
    processResult.Error = ProcessMatchFileError.InvalidHeaderError;
    console.log(`INVALID HEADER`);
    return processResult;
  }

  if (parsed.Records.length < 2) { // if there's only a header something is wrong
    processResult.Success = false;
    processResult.Error = ProcessMatchFileError.EmptyMatchesError;
    console.log(`EMPTY MATCH LIST`);
    return processResult;
  }

  let matchCount = 0;

  for (let i = 1; i < parsed.Records.length; i++) {
    if (parsed.Records[i].length == columnNames.length) {
      const c = parsed.Records[i];
      matchCount++;
      //PrimaryKit, PrimaryName, PrimaryEmail, MatchedKit, MatchedName, MatchedEmail, LargestSeg, TotalCM, Gen, LargestXSeg, TotalXCM, Overlap, CreatedDate, TestCompany
      const newMatch = new Match(c[3].trim(), c[4].trim(), c[5].trim(), c[6].trim(), c[7].trim(),
                                 c[8].trim(), c[9].trim(), c[10].trim(), c[11].trim(), c[12].trim(), c[13].trim());

      matches.push(newMatch);
    } else {
      console.log(`Match ${i} is invalid`);
    }
  }

  if (matchCount > 0) {
    const primaryKit = parsed.Records[1][0].trim();
    const primaryName = parsed.Records[1][1].trim();
    const primaryEmail = parsed.Records[1][2].trim();

    processResult.PrimaryKit = new PrimaryKit(primaryKit, primaryName, primaryEmail);
    processResult.Matches = matches;
  }

  console.log(processResult.PrimaryKit);

  console.log(`THIS MANY MATCHES: ${matchCount}`);
  console.log(matches[0]);
  
  return processResult;
}

async function TryParseCsv(input: string): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    parseCsv(input, {}, (err, records) => {
      const result = new ParseResult(records,err);
      resolve(result);
    });
  });
}

class ParseResult {
  Error: CsvError | undefined;
  Records: any;
  
  constructor(records: any, err?: CsvError) {
    this.Records = records;
    this.Error = err;
  }
}

class ProcessMatchFileResult {
  private success: boolean = false;
  private error: ProcessMatchFileError = ProcessMatchFileError.None;
  PrimaryKit: PrimaryKit | null = null;
  Matches: Match[] = [];
  InvalidMatches: number[] = [];

  constructor() {

  }

  public get Success() : boolean {
    return this.success;
  }
  public set Success(v : boolean) {
    this.success = v;
  }

  public get Error() : ProcessMatchFileError{
    return this.error;
  }
  public set Error(v : ProcessMatchFileError){
    this.error = v;
  }

  public get MatchCount() : number { 
    return this.Matches.length;
  }
}