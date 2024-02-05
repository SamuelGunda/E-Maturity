export interface Question {
  isStarFilled: boolean;
  isSaved?: boolean;
  id: string;
  articleId: number;
  correctAnswer: string | string[];
  options?: string[];
  text: string;
  image?: string;
  userAnswer: string;
}
