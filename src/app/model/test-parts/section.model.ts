import { Question } from './question.model';

export interface Section {
  // The firestore document name of the section.
  sectionId?: number;
  // The questions assigned to the section.
  questions: Question[];
  // The storage url of the articles for the section.
  articleUrl?: string[];
  /* The storage url of the audio for the listening sections,
  * this is optional because not all sections have audio.
  * audio is always in first "listening" section.
  */
  audioUrl?: string;
}
