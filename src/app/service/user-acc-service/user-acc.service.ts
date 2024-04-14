import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {

  private localStorageKey = 'savedQuestions';

  constructor(
    private firestore: AngularFirestore,
  ) {}

  selectedIcon!: string;

  getAvailableIcons(): string[] {
    return [
      'assets/user_icons/boy.png',
      'assets/user_icons/girl.png',
      'assets/user_icons/default.png',
    ];
  }
  getSelectedIcon(): string {
    return this.selectedIcon || 'assets/user_icons/default.png';
  }
}