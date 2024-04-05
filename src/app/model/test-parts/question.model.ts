export interface Question {
  id: string;
  text?: string;
  imageUrl?: string;
  answer: string | string[];

  /* Question types:
  select - radio buttons,
  select_twice - 2 sets of radio buttons,
  input - type-out answer,
  input_twice - type-out two different values,
  cancelled - question was cancelled by NUCEM,
   */
  questionType: string;

  options?: string[];
  options_2?: string [];

  userAnswer?: any;
  userAnswer_2?: string;



}
