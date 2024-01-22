import {Question} from "./question.model";

export interface Test {
    id: string;
    articles: string[];
    questions: Question[];
}
