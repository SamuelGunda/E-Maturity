import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../service/test-service/test.service';
import { Test } from '../model/test.model';
import { Observable, of, switchMap } from 'rxjs';
import { Question } from '../model/question.model';
import { ArticleQuestions } from '../model/article-questions.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

export interface ModalData {
  score: number;
  total: number;
}

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
  score: number = 0;
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    public dialog: MatDialog,
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

  openDialog(): void {
    this.checkAnswers();
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: { score: this.score, total: this.total },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
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

  checkAnswers() {
    const testResults: any[] = [];
    for (const articleQuestion of this.articleWithQuestions || []) {
      for (const question of articleQuestion.questions) {
        const questionResult: any = {
          id: question.id,
          isCorrect: false,
          correctAnswer: question.correctAnswer,
          userAnswer: question.userAnswer,
        };
        if (question.text === 'Zrušená otázka') {
          console.log(`Question ${question.id} is cancelled.`);
          questionResult.isCorrect = true;
        } else {
          if (question.correctAnswer instanceof Array) {
            for (const correctAnswer of question.correctAnswer) {
              if (question.userAnswer === correctAnswer) {
                console.log(`Question ${question.id} is correct!`);
                questionResult.isCorrect = true;
                break;
              }
            }
            if (!questionResult.isCorrect) {
              console.log(
                `Question ${question.id} is incorrect. Correct answer is ${question.correctAnswer}.`,
              );
            }
          } else {
            if (question.userAnswer === question.correctAnswer) {
              console.log(`Question ${question.id} is correct!`);
              questionResult.isCorrect = true;
            } else {
              console.log(
                `Question ${question.id} is incorrect. Correct answer is ${question.correctAnswer}.`,
              );
            }
          }
        }
        testResults.push(questionResult);
      }
    }
    return this.calculateScore(testResults);
  }

  private calculateScore(testResults: any[]) {
    let score = 0;
    let total = testResults.length;
    for (const result of testResults) {
      if (result.isCorrect) {
        score++;
      }
    }
    this.score = score;
    this.total = total;
    console.log(`Score: ${score}/${total}`);
  }
}
