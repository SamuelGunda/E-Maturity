import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDocs } from "@angular/fire/firestore";
import { TestResult } from "../../model/test-results-parts/test-result.model";
import { SectionResult } from "../../model/test-results-parts/section-result.model";
import { Result } from "../../model/test-results-parts/result.model";
import { TestService } from "../test-service/test.service";
import { Test } from "../../model/test-parts/test.model";

@Injectable({
  providedIn: 'root'
})
export class TestHistoryService {

  constructor(
    private firestore: Firestore,
    private testService: TestService,
  ) {}

  async getSavedTests(uid: string) {
    try {
      const originalAndResultList: any[] = [];
      const fullTestList: Test[] = [];
      const inList: String[] = [];
      const savedTests: TestResult[] = [];

      const userCollectionRef = collection(this.firestore, 'users');
      const documentByUidRef = doc(userCollectionRef, uid);
      const savedTestsCollectionRef = collection(documentByUidRef, 'savedTests');

      const querySnapshot = await getDocs(savedTestsCollectionRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const testResult: TestResult = {
          subCat: data["subCat"],
          year: data["year"],
          finishedAt: this.formatDate(data["finishedAt"]),
          score: data["score"],
          percentageScore: data["percentageScore"],
          sections: data["sections"].map((sectionResult: any) => {
            return {
              results: sectionResult["results"].map((result: any) => {
                return {
                  id: result["id"],
                  userAnswer: result["userAnswer"],
                  result: result["result"],
                } as Result;
              }),
            } as SectionResult;
          }),
        };
        savedTests.push(testResult);
        if (!inList.includes(testResult.subCat + "-" + testResult.year)) {
          inList.push(testResult.subCat + "-" + testResult.year);
          this.testService.getTest(testResult.subCat, testResult.year, true)
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

      if (sortedTests.length > 10) {
        await this.removeOldestTest(uid).then(() => {
          return sortedTests;
        });
      }
      // return sortedTests;
      originalAndResultList.push(sortedTests);
      originalAndResultList.push(fullTestList);
      return originalAndResultList;
    } catch (error) {
      console.error('Error fetching saved tests:', error);
      return [];
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  private async removeOldestTest(uid: string) {
    try {
      const userCollectionRef = collection(this.firestore, 'users');
      const documentByUidRef = doc(userCollectionRef, uid);
      const savedTestsCollectionRef = collection(documentByUidRef, 'savedTests');
      const querySnapshot = await getDocs(savedTestsCollectionRef);
      const allTests: any[] = [];

      querySnapshot.docs.forEach((doc) => {
        allTests.push({
          id: doc.id,
          data: doc.data(),
        });
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
          await deleteDoc(doc(savedTestsCollectionRef, oldestTestId));
        }
      }
    } catch (error) {
      console.error('Error removing oldest test:', error);
    }
  }
}
