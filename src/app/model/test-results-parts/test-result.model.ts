import { SectionResult } from './section-result.model';

export interface TestResult {
  showResults?: boolean; // This is not a field in the database, but is used to show the results of the test in history.
  subCat: string; // The subcategory of the test.
  year: string; // The year of the test.
  finishedAt: string; // The date the test was finished.
  timeTaken: string; // The time taken to complete the test.
  score: number; // The score of the test.
  percentageScore: number; // The percentage score of the test.
  sections: SectionResult[]; // The sections of the test.
}
