import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../service/test-service/test.service';
import { Test } from '../model/test.model';
import { Observable, of, switchMap } from 'rxjs';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent {
  year: string | undefined;
  subCat: string | undefined;
  test: Test | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params && params['subCat'] && params['year']) {
            this.subCat = params['subCat'];
            this.year = params['year'];
            return this.fetchTest();
          } else {
            console.error('subCat and year are required');
            return of(null);
          }
        }),
      )
      .subscribe(
        (testData: Test | null) => {
          if (testData !== null) {
            this.test = testData;
          }
        },
        (error) => {
          console.error(error);
        },
      );
  }

  isTextInput(question: Question): boolean {
    return !question.options || question.options.every((option) => !option);
  }

  private fetchTest(): Observable<Test> {
    return this.testService.getTest(this.subCat!, this.year!);
  }
}
