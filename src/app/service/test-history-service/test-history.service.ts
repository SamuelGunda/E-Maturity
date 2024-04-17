import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { TestResult } from '../../model/test-results-parts/test-result.model';
import { SectionResult } from '../../model/test-results-parts/section-result.model';
import { Result } from '../../model/test-results-parts/result.model';
import { TestService } from '../test-service/test.service';
import { Test } from '../../model/test-parts/test.model';
import { BehaviorSubject, finalize, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestHistoryService {
  constructor(
    private firestore: Firestore,
    private testService: TestService,
  ) {}

  /*
   * Fetches the saved tests from the user's history
   * and returns the saved tests and the original tests.
   * The original tests are the full tests with all information on questions and answers.
   * Saved tests are collections of the user's results.
   * Saved tests are sorted by the date they were finished.
   * If the user has more than 10 saved tests, the oldest ones are removed from the database.
   * - Samuel
   */

  getSavedTests(uid: string): Observable<any[]> {
    const userCollectionRef = collection(this.firestore, 'users');
    const documentByUidRef = doc(userCollectionRef, uid);
    const savedTestsCollectionRef = collection(documentByUidRef, 'savedTests');

    return from(getDocs(savedTestsCollectionRef)).pipe(
      map((querySnapshot) => {
        const originalAndResultList: any[] = [];
        const fullTestList: Test[] = [];
        const inList: String[] = [];
        const savedTests: TestResult[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const testResult: TestResult = {
            subCat: data['subCat'],
            year: data['year'],
            finishedAt: this.formatDate(data['finishedAt']),
            timeTaken: data['timeTaken'],
            score: data['score'],
            percentageScore: data['percentageScore'],
            sections: data['sections'].map((sectionResult: any) => {
              return {
                results: sectionResult['results'].map((result: any) => {
                  return {
                    id: result['id'],
                    userAnswer: result['userAnswer'],
                    result: result['result'],
                  } as Result;
                }),
              } as SectionResult;
            }),
          };
          savedTests.push(testResult);
          if (!inList.includes(testResult.subCat + '-' + testResult.year)) {
            inList.push(testResult.subCat + '-' + testResult.year);
            this.testService
              .getTest(testResult.subCat, testResult.year, true)
              .subscribe((test: Test) => {
                fullTestList.push(test);
              });
          }
        });

        const sortedTests = savedTests.sort((a, b) => {
          const dateA = new Date(a.finishedAt);
          const dateB = new Date(b.finishedAt);
          return dateB.getTime() - dateA.getTime();
        });

        originalAndResultList.push(sortedTests);
        originalAndResultList.push(fullTestList);
        return originalAndResultList;
      }),
    );
  }

  /*
   * Formats the date string to be in the format "YYYY-MM-DD HH:MM"
   * - Samuel
   */

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  /*
   * Removes the oldest test from the user's history
   * - Samuel
   */

  removeOldestTest(uid: string): Observable<boolean> {
    const loading = new BehaviorSubject<boolean>(true);

    const userCollectionRef = collection(this.firestore, 'users');
    const documentByUidRef = doc(userCollectionRef, uid);
    const savedTestsCollectionRef = collection(documentByUidRef, 'savedTests');

    const allTests: any[] = [];

    from(getDocs(savedTestsCollectionRef))
      .pipe(finalize(() => loading.next(false)))
      .subscribe({
        next: (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allTests.push({ id: doc.id, data: doc.data() });
          });

          const sortedTests = allTests.sort((a, b) => {
            const dateA = new Date(a.data.finishedAt);
            const dateB = new Date(b.data.finishedAt);
            return dateA.getTime() - dateB.getTime();
          });

          while (sortedTests.length > 10) {
            const oldestTest = sortedTests.shift();
            if (oldestTest) {
              const oldestTestId = oldestTest.id;
              const docRef = doc(savedTestsCollectionRef, oldestTestId);
              from(deleteDoc(docRef)).subscribe({
                next: () => console.log('Document successfully deleted!'),
                error: (err) => console.error('Error deleting document: ', err),
              });
            }
          }
        },
        error: (error) => {
          console.error('Error fetching saved tests:', error);
          loading.next(false);
        },
      });

    return loading.asObservable();
  }
}
