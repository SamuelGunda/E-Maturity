import { Section } from './section.model';

export interface Test {
  sections: Section[]; // The sections of the test.
  subCat: string; // The subcategory of the test.
  year: string; // The year of the test.
}
