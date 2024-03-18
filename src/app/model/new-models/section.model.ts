import { Question } from "./question.model";

export interface Section {
  questions: Question[];
  articleUrl?: string;
}
