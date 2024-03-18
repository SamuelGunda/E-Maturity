export interface Question {
  id: string;
  text?: string;
  imageUrl?: string;
  answer: any;
  options?: string[];
  options_1?: string [];
  options_2?: string [];
  questionType: string;
}
