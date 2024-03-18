import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { UserAccountService } from '../../../service/user-acc-service/user-acc.service';
import { Question } from '../../../model/question.model';
import { Observable } from 'rxjs';
import { SavedTest } from '../../../model/saved-test.model';
import { SavedTestService } from '../../../service/saved-test-service/saved-test.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
  userName: string = '';
  isDarkMode: boolean = false;
  darkMode: boolean = false;

  constructor(
    private authService: AuthService,
    public userAccountService: UserAccountService,
    public savedTestService: SavedTestService,
  ) {}

  ngOnInit() {
    this.authService.userData.subscribe((user) => {
      if (user) {
        this.userName = user.displayName || '';
      }
    });
  }

  savedTests$: Observable<SavedTest[]> =
    this.userAccountService.getSavedTests();

  removeQuestion(question: Question) {
    this.userAccountService.removeQuestion(question);
  }

  getSelectedIcon(): string {
    return this.userAccountService.getSelectedIcon();
  }
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  sendData(): void {
    if (this.selectedFile) {
      this.userAccountService.sendData(this.selectedFile);
    } else {
      console.error('No file selected.');
    }
  }

  darkToggle = document.querySelector('.toggle_dark');

  toggleDark() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.toggle('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
