export interface Question {
  id: string;
  articleId: number;
  correctAnswer: string | string[];
  options?: string[];
  text: string;
  image?: string;
  userAnswer: string;
}
