import { Question } from './question.model';

export interface Section {
  questions: Question[]; // The questions of the section.
  article_url?: string; // The url of the article for the section.
}
