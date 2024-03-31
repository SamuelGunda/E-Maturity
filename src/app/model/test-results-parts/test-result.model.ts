import { SectionResult } from "./section-result.model";

export interface TestResult {
  subCat: string;
  year: string;
  finishedAt: string;
  score: number;
  sections: SectionResult[];
}
