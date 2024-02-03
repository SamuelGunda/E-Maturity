export interface QuestionResult {
  questionId: string;
  text: string;
  correctAnswer: string[] | string;
  userAnswer: string;
  isCorrect: boolean;
  options?: string[];
}
export interface SavedTest {
  id: string;
  questions: QuestionResult[];
}
