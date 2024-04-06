import { Question } from '../test-parts/question.model';

export interface Result {
  id: string; // The id of the question.
  userAnswer: string; // The answer the user gave to the question.
  result: boolean; // Whether the user's answer was correct.
}
