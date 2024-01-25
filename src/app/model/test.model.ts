import { Question } from './question.model';
import { Article } from './article.model';

export interface Test {
  id: string;
  articles: Article[];
  questions: Question[];
}
