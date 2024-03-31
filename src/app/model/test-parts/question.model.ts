export interface Question {
  id: string;
  text?: string;
  image_url?: string;
  answer: string | string[];
  options?: string[];
  user_answer?: any;
  question_type: string;

  options_1?: string [];
  options_2?: string [];
  user_answer_option_1: string;
  user_answer_option_2: string;
}
