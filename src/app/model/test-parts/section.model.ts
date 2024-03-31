import { Question } from "./question.model";

export interface Section {
  questions: Question[];
  article_url?: string;
}
