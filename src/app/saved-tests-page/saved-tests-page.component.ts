import { Component } from '@angular/core';
import { SavedTestService } from '../service/saved-test-service/saved-test.service';
import { SavedTest } from '../model/saved-test.model';

@Component({
  selector: 'app-saved-tests-page',
  templateUrl: './saved-tests-page.component.html',
  styleUrls: ['./saved-tests-page.component.css'],
})
export class SavedTestsPageComponent {
  savedTests: SavedTest[] = [];
  selectedTest: SavedTest | null = null;

  constructor(private savedTestService: SavedTestService) {}
  ngOnInit(): void {
    if (localStorage.getItem('uid')) {
      this.loadSavedTests();
    }
  }

  async loadSavedTests() {
    try {
      const uid = localStorage.getItem('uid');
      if (!uid) {
        console.error('Uid is not set. User is not logged in.');
        return;
      }
      this.savedTests = await this.savedTestService.getSavedTests(uid);
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
