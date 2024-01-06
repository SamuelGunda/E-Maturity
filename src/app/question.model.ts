export class Question {
    id!: number;
    text!: string;
    options?: string[];
    correctAnswer?: string | string[];
}