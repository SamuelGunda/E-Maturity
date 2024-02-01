import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../service/test-service/test.service';
import { Test } from '../model/test.model';
import { Observable, of, switchMap } from 'rxjs';
import { Question } from '../model/question.model';
import { ArticleQuestions } from '../model/article-questions.model';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent {
  year: string | undefined;
  subCat: string | undefined;
  test: Test | undefined;
  articleWithQuestions: ArticleQuestions[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {
    this.route.params.subscribe((params) => {
      if (params && params['subCat'] && params['year']) {
        this.subCat = params['subCat'];
        this.year = params['year'];
        this.fetchTest().then((testData) => {
          testData.subscribe((test) => {
            this.test = test;
            this.articleWithQuestions = this.getTestObject();
            console.log(this.articleWithQuestions);
          });
        });
      } else {
        console.error('subCat and year are required');
      }
    });
  }

  isTextInput(question: Question): boolean {
    return !question.options || question.options.every((option) => !option);
  }

  private async fetchTest(): Promise<Observable<Test>> {
    return this.testService.getTest(this.subCat!, this.year!);
  }

  private getTestObject(): ArticleQuestions[] {
    const articleWithQuestions: ArticleQuestions[] = [];
    this.test?.articles.forEach((article) => {
      const articleQuestions: Question[] = [];
      this.test?.questions.forEach((question) => {
        if (question.articleId === parseInt(article.id)) {
          articleQuestions.push(question);
        }
      });
      articleWithQuestions.push({ article, questions: articleQuestions });
    });
    return articleWithQuestions;
  }
}
