import { Question } from './question.model';
import { Article } from './article.model';

export interface ArticleQuestions {
  article: Article;
  questions: Question[];
}
