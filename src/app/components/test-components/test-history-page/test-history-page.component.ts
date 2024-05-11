import { Component } from '@angular/core';
import { TestHistoryService } from '../../../service/test-history-service/test-history.service';
import { TestResult } from '../../../model/test-results-parts/test-result.model';
import { Test } from '../../../model/test-parts/test.model';
import { CookieService } from 'ngx-cookie';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/service/auth-serivce/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-test-history-page',
    templateUrl: './test-history-page.component.html',
    styleUrls: ['./test-history-page.component.css'],
    animations: [
        trigger('fade', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.5s ease-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('0.2s ease-in', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class TestHistoryPageComponent {
    isLoading: boolean = false; // If the page is loading, this will be true
    isSavedTestsEmpty: boolean = true; // If there are no saved tests, this will be true
    savedTests: TestResult[] = []; // The saved tests from the user's history
    originalTests: Test[] = []; // The original tests with full questions and answers
    selectedTest: Test = {} as Test; // Used to display the selected test on front-end

    constructor(
        private testHistoryService: TestHistoryService,
        private cookieService: CookieService,
        public authServ: AuthService,
    ) {
        this.savedTests.forEach((test) => {
            test.showResults = false;
        });
    }

    ngOnInit(): void {
        this.fetchTestsFromUserHistory();
    }

    /*
     * Fetches the tests from the user's history
     * and sets the savedTests and originalTests arrays
     * - Samuel
     */

    fetchTestsFromUserHistory() {
        try {
            const uid = this.cookieService.get('uid');
            if (!uid) {
                console.error('Uid is not set. User is not logged in.');
                return;
            }
            this.testHistoryService
                .removeOldestTest(uid)
                .pipe(
                    switchMap(() => this.testHistoryService.getSavedTests(uid)),
                )
                .subscribe({
                    next: (tests) => {
                        this.savedTests = tests[0];
                        this.originalTests = tests[1];
                        console.log('Tests:', tests);

                        if (this.savedTests.length > 0) {
                            this.isSavedTestsEmpty = false;
                        }

                        console.log('Saved tests:', this.savedTests);
                    },
                    error: (error) => {
                        console.error('Error loading saved tests:', error);
                    },
                });
        } catch (error) {
            console.error('Error loading saved tests:', error);
        }
    }

    /*
     * Selects a test to display on the front-end
     * - Samuel
     */

    selectTest(test: TestResult) {
        console.log(this.originalTests);
        console.log('Test:', test);
        for (const ogTest of this.originalTests) {
            console.log('Original test:', ogTest);
            if (ogTest.subCat === test.subCat && ogTest.year === test.year) {
                this.selectedTest = ogTest;
                console.log('Selected test:', this.selectedTest);
            }
        }
    }
}
