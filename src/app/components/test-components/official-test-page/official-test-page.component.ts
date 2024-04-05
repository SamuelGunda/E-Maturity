import { Component } from '@angular/core';
import { Test } from "../../../model/test-parts/test.model";
import { TestService} from "../../../service/test-service/test.service";
import { ActivatedRoute } from "@angular/router";
import { async, Observable } from "rxjs";
import { TestResult } from "../../../model/test-results-parts/test-result.model";
import { Result } from "../../../model/test-results-parts/result.model";
import { SectionResult } from "../../../model/test-results-parts/section-result.model";
import { Question } from "../../../model/test-parts/question.model";


@Component({
  selector: 'app-official-test-page',
  templateUrl: './official-test-page.component.html',
  styleUrls: ['./official-test-page.component.css']
})

export class OfficialTestPageComponent {
  year: string | undefined;
  subCat: string | undefined;
  test: Test | undefined;
  testResults: TestResult | undefined;
  display: any;

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
    this.timer();
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
        percentageScore: 0,
        sections: []
      };

      for (const section of this.test.sections) {
        const sectionResult: Result[] = [];

        for (const question of section.questions) {

          if (question.questionType === "select_twice") {
            if (question.userAnswer === undefined || question.userAnswer_2 === undefined
              || question.userAnswer === "" || question.userAnswer_2 === "") {
              question.userAnswer = "Nevyplnené";
            } else {
              question.userAnswer = question.userAnswer + "-" + question.userAnswer_2;
            }
          }

          if(question.questionType === "input_twice") {
            if (question.userAnswer === undefined || question.userAnswer_2 === undefined
              || question.userAnswer === "" || question.userAnswer_2 === "") {
              question.userAnswer = "Nevyplnené";
            } else {
              question.userAnswer = question.userAnswer.trim() + ", " + question.userAnswer_2.trim();
            }
          }

          if (question.userAnswer === undefined || question.userAnswer === "") {
            question.userAnswer = "Nevyplnené";
          }

          const result: Result = {
            id: question.id,
            userAnswer: question.userAnswer,
            result: false,
          };
          sectionResult.push(result);
        }

        const sectionResults: SectionResult = {
          results: sectionResult
        };
        testResults.sections.push(sectionResults);
      }
      (await this.testService.getTestResult(testResults)).subscribe(
        (result: TestResult) => {
          this.testResults = result;
        },
        (error) => {
          console.error("Error updating test results:", error);
        }
      );
    }
  }

  private getTime() {
    switch (this.subCat) {
      case "anj": {
        const level = this.year?.split("-")[1];
        if (level === "B1") {
          return 100;
        } else if (level === "B2") {
          return 120;
        } else if (level === "C1") {
          return 150;
        } else {
          console.error("Unknown level");
          return 0;
        }
      }
      case "sjl": {
        return 100;
      }
      case "mat": {
        return 150;
      }
      default: {
        console.error("Unknown subCat");
        return 0;
      }
    }
  }

  private async timer(time: number = this.getTime()) {
    let seconds: number = time * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = time < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }
}
