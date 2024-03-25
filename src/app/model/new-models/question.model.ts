export interface Question {
  id: string;
  text?: string;
  image_url?: string;
  answer: any;
  options?: string[];
  options_1?: string [];
  options_2?: string [];
  question_type: string;
}
