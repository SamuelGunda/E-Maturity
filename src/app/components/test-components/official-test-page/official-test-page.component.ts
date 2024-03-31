import { Component } from '@angular/core';
import { Test } from "../../../model/test-parts/test.model";
import { TestService} from "../../../service/test-service/test.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { TestResult } from "../../../model/test-results-parts/test-result.model";
import { Result } from "../../../model/test-results-parts/result.model";
import { SectionResult } from "../../../model/test-results-parts/section-result.model";


@Component({
  selector: 'app-official-test-page',
  templateUrl: './official-test-page.component.html',
  styleUrls: ['./official-test-page.component.css']
})

export class OfficialTestPageComponent {
  year: string | undefined;
  subCat: string | undefined;
  test: Test | undefined;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
  ) {
    this.route.params.subscribe((params) => {
      if (params) {
        this.subCat = params['subCat'];
        this.year = params['year'];
        this.fetchTest().subscribe(
          (data: Test) => {
            this.test = data;
            console.log(this.test);
          },
          (error) => {
            console.error('Error fetching test:', error);
          },
        );
      }
    });
  }

  private fetchTest(): Observable<Test> {
    if (this.subCat && this.year) {
      return this.testService.getTest(this.subCat, this.year, false);
    } else {
      return new Observable<Test>((observer) => {
        observer.next({} as Test);
        observer.complete();
      });
    }
  }

  protected async submitTest() {
    if (this.test) {
      let testResults: TestResult = {
        subCat: this.subCat || "",
        year: this.year || "",
        finishedAt: new Date().toISOString(),
        score: 0,
        sections: []
      };

      for (const section of this.test.sections) {
        const sectionResult: Result[] = [];

        for (const question of section.questions) {
          const result: Result = {
            id: question.id,
            userAnswer: question.user_answer,
            result: false
          };
          sectionResult.push(result);
        }

        const sectionResults: SectionResult = {
          results: sectionResult
        };
        testResults.sections.push(sectionResults);
      }

      this.testService.getTestResult(testResults).subscribe(
        (updatedTestResults: TestResult) => {
          console.log(updatedTestResults);
        },
        (error) => {
          console.error("Error updating test results:", error);
        }
      );
    }
  }
}
