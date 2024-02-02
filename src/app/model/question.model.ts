export interface Question {
  id: string;
  articleId: number;
  correctAnswer: string;
  options?: string[];
  text: string;
  image?: string;
}
