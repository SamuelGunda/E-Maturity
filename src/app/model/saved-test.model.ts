export interface QuestionResult {
  questionId: string;
  text: string;
  correctAnswer: string[] | string;
  userAnswer: string;
  isCorrect: boolean;
  options?: string[];
  image?: string;
}
export interface SavedTest {
  id: string;
  testName: string;
  finishedAt: Date;
  questions: QuestionResult[];
}
