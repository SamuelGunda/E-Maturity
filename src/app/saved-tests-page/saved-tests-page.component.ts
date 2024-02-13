import { Component, OnInit } from '@angular/core';
import { SavedTestService } from '../service/saved-test-service/saved-test.service';
import { SavedTest } from '../model/saved-test.model';
import { DarkModeService } from '../dark-mode.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-saved-tests-page',
  templateUrl: './saved-tests-page.component.html',
  styleUrls: ['./saved-tests-page.component.css'],
})
export class SavedTestsPageComponent implements OnInit {
  savedTests: SavedTest[] = [];
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
    setTimeout(() => {
      this.loadSavedTests();
      this.isLoading = false;
    }, 1500);

    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  async loadSavedTests() {
    const seassionUserId = sessionStorage.getItem("firebase:authUser:AIzaSyDrXz37bgp6zYCw-X9eKtQlg2Q6j4tjDMI:[DEFAULT]");
    try {
      const uid = localStorage.getItem('uid');
      const  suid = seassionUserId;
      if (!uid || !suid) {
        console.error('Uid is not set. User is not logged in.');
        return;
      }
      this.savedTests = await this.savedTestService.getSavedTests(uid);
      if (this.savedTests.length > 0) {
        this.revealDetails(this.savedTests[0]);
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
