import { Section } from './section.model';

export interface Test {
  // The sections of the test.
  sections: Section[];
  // The subcategory of the test.
  subCat: string;
  // The year test was released.
  year: string;
}
