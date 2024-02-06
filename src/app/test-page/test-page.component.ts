import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../service/test-service/test.service';
import { Test } from '../model/test.model';
import { Observable, timer } from 'rxjs';
import { Question } from '../model/question.model';
import { ArticleQuestions } from '../model/article-questions.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { QuestionResult, SavedTest } from '../model/saved-test.model';
import { AuthService } from '../auth.service';
import { DarkModeService } from '../dark-mode.service';
import { UserAccountService } from '../user-acc.service';
import {TimerService} from "../service/timer-service/timer.service";


export interface ModalData {
  score: number;
  total: number;
  savedTest: SavedTest;
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})

export class TestPageComponent implements OnInit {
  interval: any;
  subscribeTimer: any;
  isStarFilled = false;
  isDarkMode: boolean = false;
  year: string | undefined;
  subCat: string | undefined;
  test: Test | undefined;
  articleWithQuestions: ArticleQuestions[] | undefined;
  score: number = 0;
  total: number = 0;
  timeLeft: number = 0;
  timerIsOn: boolean = false;

  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    public dialog: MatDialog,
    public authService: AuthService,
    private darkModeService: DarkModeService,
    private userAccountService: UserAccountService,
    private timerService: TimerService
  ) {
    this.route.params.subscribe((params) => {
      if (params && params['subCat'] && params['year']) {
        this.subCat = params['subCat'];
        this.year = params['year'];
        this.startTimer();
        this.fetchTest().then((testData) => {
          testData.subscribe((test) => {
            this.test = test;
            this.articleWithQuestions = this.getTestObject();
            console.log(this.articleWithQuestions);
            this.fillStarsForSavedQuestions();
          });
        });
      } else {
        console.error('subCat and year are required');
      }
    });
  }

  toggleStar(question: Question): void {
    question.isStarFilled = !question.isStarFilled;
    if (question.isStarFilled) {
      this.userAccountService.saveQuestion(question);
    } else {
      this.userAccountService.removeQuestion(question);
    }
  }

  startTimer() {
    console.log('timer started');
    this.timerIsOn = true;
    this.timerService.setTimerIsOn(this.timerIsOn);
    console.log("startTimer");
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
      this.timerService.setTimeLeft(this.timeLeft);
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }




  private fillStarsForSavedQuestions() {
    if (this.articleWithQuestions) {
      for (const articleQuestion of this.articleWithQuestions) {
        for (const question of articleQuestion.questions) {
          const savedQuestion = this.userAccountService
            .savedQuestionsSubject.value.find(
              (savedQ) => savedQ.id === question.id
            );
          if (savedQuestion) {
            question.isStarFilled = true;
          }
        }
      }
    }
  }

  openDialog(): void {
    const savedTest = this.checkAnswers();

    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: { score: this.score, total: this.total, savedTest: savedTest },
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
          // Add isStarFilled property to each question
          question.isStarFilled = false;
          articleQuestions.push(question);
        }
      });
      articleWithQuestions.push({ article, questions: articleQuestions });
    });
    return articleWithQuestions;
  }
  checkAnswers(): SavedTest {
    const savedTest: SavedTest = {} as SavedTest;
    if (this.subCat === 'sk') {
      savedTest.testName = 'Slovenčina ' + this.year + ' ';
    } else if (this.subCat === 'aj') {
      savedTest.testName = 'Angličtina ' + this.year + ' ';
    } else if (this.subCat === 'mat') {
      savedTest.testName = 'Matematika ' + this.year + ' ';
    }
    savedTest.id = this.year + '-' + this.subCat;
    savedTest.questions = [];
    savedTest.finishedAt = new Date();
    const testResults: any[] = [];
    for (const articleQuestion of this.articleWithQuestions || []) {
      for (const question of articleQuestion.questions) {
        const questionResult: QuestionResult = {
          questionId: question.id,
          text: question.text,
          image: question.image,
          isCorrect: false,
          correctAnswer: question.correctAnswer,
          userAnswer: question.userAnswer,
          options: question.options,
        };
        if (questionResult.image === undefined) {
          questionResult.image = '';
        }
        if (questionResult.correctAnswer === undefined) {
          questionResult.correctAnswer = 'Zrušena otazka';
        }
        if (questionResult.text === undefined && questionResult.image === '') {
          questionResult.text = 'Zrušená otázka';
        } else if (questionResult.text === undefined) {
          questionResult.text = 'Riešenie otázky s obrázkom';
        }
        if (questionResult.options === undefined) {
          questionResult.options = [];
        }
        if (
          questionResult.userAnswer === undefined ||
          questionResult.userAnswer === ''
        ) {
          questionResult.userAnswer = 'Nevyplnene';
        }
        if (question.text === 'Zrušená otázka') {
          // console.log(Question ${question.id} is cancelled.);
          questionResult.isCorrect = true;
        } else {
          if (question.correctAnswer instanceof Array) {
            for (const correctAnswer of question.correctAnswer) {
              if (question.userAnswer === correctAnswer) {
                // console.log(Question ${question.id} is correct!);
                questionResult.isCorrect = true;
                break;
              }
            }
            if (!questionResult.isCorrect) {
              // console.log(
              //   Question ${question.id} is incorrect. Correct answer is ${question.correctAnswer}.,
              // );
            }
          } else {
            if (question.userAnswer === question.correctAnswer) {
              // console.log(Question ${question.id} is correct!);
              questionResult.isCorrect = true;
            } else {
              // console.log(
              //   Question ${question.id} is incorrect. Correct answer is ${question.correctAnswer}.,
              // );
            }
          }
        }
        savedTest.questions.push(questionResult);
        testResults.push(questionResult);
      }
    }
    this.calculateScore(testResults);
    return savedTest;
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
