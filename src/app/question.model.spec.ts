import { Question } from './question.model';
import { Answer } from './answer.model';

describe('Question', () => {
  it('should create an instance', () => {
    expect(new Question()).toBeTruthy();
  });
});