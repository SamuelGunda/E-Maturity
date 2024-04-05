import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, switchMap } from "rxjs";
import { collection, doc, Firestore, getDoc, getDocs, setDoc } from "@angular/fire/firestore";
import { Test } from "src/app/model/test-parts/test.model";
import { Question } from "src/app/model/test-parts/question.model";
import { Section } from "src/app/model/test-parts/section.model";
import { TestResult } from "../../model/test-results-parts/test-result.model";
import { Result } from "../../model/test-results-parts/result.model";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private firestore: Firestore,
  ) {
  }

  getTestsYears(subCat: string): Observable<string[]> {

    const testsCollection = collection(this.firestore, 'tests');
    const officialTests = doc(testsCollection, 'official_tests');
    const subCatCollection = collection(officialTests, subCat);
    return from(getDocs(subCatCollection)).pipe(
      map((querySnapshot) => {
        const years: string[] = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          years.push(doc.id);
        });
        return years;
      }),
    );
  }

  getTest(subCat: string, year: string, showAnswers: boolean): Observable<Test> {
    const testsCollection = collection(this.firestore, 'tests');
    const officialTests = doc(testsCollection, 'official_tests');
    const subCatCollection = collection(officialTests, subCat);
    const testDoc = doc(subCatCollection, year);
    const sectionsCollection = collection(testDoc, 'sections');

    return from(getDocs(sectionsCollection)).pipe(
      switchMap((querySnapshot) => {
        const sections: Observable<Section>[] = querySnapshot.docs.map((doc) => {
          const questionsCollection = collection(doc.ref, 'questions');
          return from(getDocs(questionsCollection)).pipe(
            map((questionSnapshot) => {
              const questions: Question[] = questionSnapshot.docs.map((qDoc) => {
                const data = qDoc.data();
                if (!showAnswers) {
                  delete data["answer"];
                }
                return {
                  id: qDoc.id,
                  text: data["text"],
                  imageUrl: data["image_url"],
                  answer: data["answer"],
                  questionType: data["question_type"],
                  options: data["options"],
                  options_2: data["options_2"],
                  userAnswer: "",
                  userAnswer_2: "",
                } as Question;
              });
              return {
                questions: questions,
                articleUrl: doc.data()["article_url"],
              } as Section;
            }),
          );
        });
        return forkJoin(sections);
      }),
      map((sections) => {
        return {
          sections: sections,
          subCat: subCat,
          year: year,
        } as Test;
      }),
    );
  }

  async getTestResult(testResults: TestResult): Promise<Observable<TestResult>> {
    return new Observable<TestResult>((observer) => {
      this.getTest(testResults.subCat, testResults.year, true).subscribe(
        (data: Test) => {
          const test = data;
          const sections = test.sections;
          let questionNumber = 0;
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const resultSection = testResults.sections[i];

            for (let j = 0; j < section.questions.length; j++) {
              questionNumber++;
              const question = section.questions[j];
              const result = resultSection.results[j];
              result.result = this.compareUserAndCorrectAnswer(question, result);
              if (result.result) {
                testResults.score++;
              }
            }
          }

          testResults.percentageScore = Math.round((testResults.score / questionNumber) * 10000) / 100;

          const uid = localStorage.getItem('uid');

          if (uid) {
            this.saveFinishedTest(uid, testResults);
          } else {
            console.error("User is not logged in");
          }

          observer.next(testResults);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  private compareUserAndCorrectAnswer(question: Question, result: Result) {

    if (Array.isArray(question.answer)) {
      return question.answer.includes(result.userAnswer)
    }
    return question.answer === result.userAnswer;
  }

  private saveFinishedTest(uid: string, finishedTest: TestResult): void {
    const dataCollection = collection(this.firestore, 'users');
    const documentRef = doc(dataCollection, uid);
    const savedTestsCollectionRef = collection(documentRef, 'savedTests');
    const savedTestDocumentRef = doc(savedTestsCollectionRef);
    setDoc(savedTestDocumentRef, finishedTest).then(r => console.log(r)).catch(e => console.log(e));
  }
}

