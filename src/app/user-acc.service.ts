
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/model/question.model';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  public savedQuestionsSubject = new BehaviorSubject<Question[]>([]);
  savedQuestions$ = this.savedQuestionsSubject.asObservable();

  private localStorageKey = 'savedQuestions';

  constructor() {
    this.loadSavedQuestionsFromLocalStorage();
  }
  saveQuestion(question: Question) {
    question.isSaved = true;
    this.savedQuestionsSubject.next([...this.savedQuestionsSubject.value, question]);
    this.saveQuestionsToLocalStorage(this.savedQuestionsSubject.value);
  }
  
  removeQuestion(question: Question) {
    question.isSaved = false;
    const updatedQuestions = this.savedQuestionsSubject.value.filter((q) => q.id !== question.id);
    this.savedQuestionsSubject.next(updatedQuestions);
    this.saveQuestionsToLocalStorage(updatedQuestions);
  }

  private saveQuestionsToLocalStorage(questions: Question[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(questions));
  }

  private loadSavedQuestionsFromLocalStorage() {
    const savedQuestionsJson = localStorage.getItem(this.localStorageKey);
    if (savedQuestionsJson) {
      const savedQuestions = JSON.parse(savedQuestionsJson);
      this.savedQuestionsSubject.next(savedQuestions);
    }
  }
}