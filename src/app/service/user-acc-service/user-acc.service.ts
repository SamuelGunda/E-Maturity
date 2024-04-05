import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {

  private localStorageKey = 'savedQuestions';

  constructor() {}

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
