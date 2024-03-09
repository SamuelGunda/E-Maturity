import { Component, OnInit } from '@angular/core';
import { SavedTestService } from '../../../service/saved-test-service/saved-test.service';
import { SavedTest } from '../../../model/saved-test.model';
import { DarkModeService } from '../../../service/dark-mode-serivce/dark-mode.service';
import { AuthService } from '../../../service/auth-serivce/auth.service';

@Component({
  selector: 'app-saved-tests-page',
  templateUrl: './saved-tests-page.component.html',
  styleUrls: ['./saved-tests-page.component.css'],
})
export class SavedTestsPageComponent implements OnInit {
  savedTests: SavedTest[] = [];
  isSavedTestsEmpty: boolean = true;
  selectedTest: SavedTest | null = null;
  isDarkMode: boolean = false;
  isLoading: boolean = true;
  authService: AuthService;

  constructor(
    private savedTestService: SavedTestService,
    private darkModeService: DarkModeService,
    authService: AuthService,
  ) {
    this.authService = authService;
  }
  ngOnInit(): void {
    this.loadSavedTests().then((r) => (this.isLoading = false));
    // setTimeout(() => {
    //   this.loadSavedTests();
    //   this.isLoading = false;
    // }, 200);

    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  async loadSavedTests() {
    try {
      const uid = localStorage.getItem('uid');
      if (!uid) {
        console.error('Uid is not set. User is not logged in.');
        return;
      }
      this.savedTests = await this.savedTestService.getSavedTests(uid);
      if (this.savedTests.length > 0) {
        this.isSavedTestsEmpty = false;
        this.revealDetails(this.savedTests[0]);
      } else {
        this.isSavedTestsEmpty = true;
      }
    } catch (error) {
      console.error('Error loading saved tests:', error);
    }
  }

  revealDetails(savedTest: SavedTest) {
    if (this.selectedTest === savedTest) {
      this.selectedTest = null;
      return;
    }
    this.selectedTest = savedTest;
  }
}
