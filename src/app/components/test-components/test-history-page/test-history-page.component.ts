import { Component } from '@angular/core';
import { TestHistoryService } from "../../../service/test-history-service/test-history.service";
import { TestResult } from "../../../model/test-results-parts/test-result.model";
import { Test } from "../../../model/test-parts/test.model";

@Component({
  selector: 'app-test-history-page',
  templateUrl: './test-history-page.component.html',
  styleUrls: ['./test-history-page.component.css']
})
export class TestHistoryPageComponent {
  isLoading: boolean = true;
  isSavedTestsEmpty: boolean = true;
  savedTests: TestResult[] = [];
  originalTests: Test[] = [];
  selectedTest: Test = {} as Test;

  constructor(private testHistoryService: TestHistoryService) {
    this.savedTests.forEach(test => {
      test.showResults = false;
    });
  }

  ngOnInit(): void {
    this.fetchTestsFromUserHistory().then((r) => (this.isLoading = false));
  }

  async fetchTestsFromUserHistory() {
    try {
      const uid = localStorage.getItem('uid');
      if (!uid) {
        console.error('Uid is not set. User is not logged in.');
        return;
      }

      const tests = await this.testHistoryService.getSavedTests(uid)
      this.savedTests = tests[0];
      this.originalTests = tests[1];
      console.log('Tests:', tests);

      if (this.savedTests.length > 0) {
        this.isSavedTestsEmpty = false;
      }

      console.log('Saved tests:', this.savedTests);

    } catch (error) {
      console.error('Error loading saved tests:', error);
    }
  }

  selectTest(test: TestResult) {
    for (const ogTest of this.originalTests) {
      if (ogTest.subCat === test.subCat && ogTest.year === test.year) {
        this.selectedTest = ogTest;
      }
      break;
    }
  }
}
