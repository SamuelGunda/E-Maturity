export interface Question {
  id: string; // The id of the question.
  text?: string; // The text of the question.
  imageUrl?: string; // The url of the image for the question.
  answer: string | string[]; // The correct answer to the question.
  questionType: string;

  /* Question types:
   * select - radio buttons,
   * select_twice - 2 sets of radio buttons,
   * input - type-out answer,
   * input_twice - type-out 2 different values,
   * cancelled - question was cancelled by NUCEM,
   */

  options?: string[]; // The options for the question.
  options_2?: string[]; // The options for the question, if it has 2 sets of options.

  userAnswer?: any; // The answer the user gave to the question.
  userAnswer_2?: string; // The answer the user gave to the question, if it has 2 values to input.
}
