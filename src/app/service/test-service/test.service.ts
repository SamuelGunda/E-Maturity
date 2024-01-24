import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {Test} from "../../model/test.model";
import {collection, Firestore, getDocs} from "@angular/fire/firestore";
import {Question} from "../../model/question.model";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private firestore: Firestore
  ) {
  }

  getTestsYears(subCat: string): Observable<string[]> {
    const dataCollection = collection(this.firestore, "test");

    return from(
      getDocs(dataCollection).then(querySnapshot => {
        return querySnapshot.docs
          .filter(doc => {
            const subject = doc.id.split("-")[1].toLowerCase();
            return subCat === subject;
          })
          .map(doc => {
            const year = doc.id.split("-")[0];
            return year;
          });
      })
    );
  }

  getTests(subCat: string): Observable<Test[]> {
    const dataCollection = collection(this.firestore, "test");

    return from(
      getDocs(dataCollection).then(querySnapshot => {
        return querySnapshot.docs
          .filter(doc => {
            const subject = doc.id.split("-")[1].toLowerCase();
            const year = doc.id.split("-")[0];
            return subCat === subject;
          })
          .map(doc => {
            const data = doc.data() as { id: string; articles: string[]; questions: Question[] };
            return {
              id: doc.id,
              articles: data.articles,
              questions: data.questions,
            } as Test;
          });
      })
    );
  }
}
