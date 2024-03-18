import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, switchMap } from "rxjs";
import { collection, doc, Firestore, getDocs } from "@angular/fire/firestore";
import { Test } from "src/app/model/new-models/test.model";
import { Question } from "src/app/model/new-models/question.model";
import { Section } from "src/app/model/new-models/section.model";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private firestore: Firestore,
  ) { }


  // Get the years of the tests for a given subcategory
  getTestsYears(subCat: string): Observable<string[]> {

    const testsCollection = collection(this.firestore, 'tests');
    const officialTests = doc(testsCollection, 'official_tests');
    const subCatCollection = collection(officialTests, subCat);
    return from(getDocs(subCatCollection)).pipe(
      map((querySnapshot) => {
        const years: string[] = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          years.push(doc.id);
        });
        return years;
      }),
    );
  }

  getTest(subCat: string, year: string): Observable<Test> {
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
                return {
                  id: qDoc.id,
                  ...qDoc.data(),
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
        } as Test;
      }),
    );
  }

}

