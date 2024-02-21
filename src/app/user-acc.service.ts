
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Question } from 'src/app/model/question.model';
import { SavedTest } from './model/saved-test.model';
import { SavedTestService } from './service/saved-test-service/saved-test.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  public savedQuestionsSubject = new BehaviorSubject<Question[]>([]);
  savedQuestions$ = this.savedQuestionsSubject.asObservable();

  private localStorageKey = 'savedQuestions';

  constructor(public savedTestService : SavedTestService) {
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

  selectedIcon!: string;

  getAvailableIcons(): string[] {
    return [
      'assets/user_icons/boy.png',
      'assets/user_icons/girl.png',
      'assets/user_icons/default.png'
    ];
  }
  getSelectedIcon(): string {
    return this.selectedIcon || 'assets/user_icons/default.png';
  }

  getSavedTests(): Observable<SavedTest[]> {
    const userId = localStorage.getItem('uid');
    if (userId !== null) {
      return from(this.savedTestService.getSavedTests(userId));
    } else {
      return of([]);
    }
  }
}