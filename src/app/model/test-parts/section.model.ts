import { Question } from './question.model';

export interface Section {
  // The questions of the section.
  questions: Question[];
  // The u// rl of the articles for the section.
  articleUrl?: string[];
  // The url of the audio for the listening section.
  audioUrl?: string;
}
