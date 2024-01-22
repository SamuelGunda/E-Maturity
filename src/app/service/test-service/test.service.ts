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
    private firestore : Firestore
  ) { }

  getTests(): Observable<Test[]> {
    const dataCollection = collection(this.firestore, "test");

    return from(
      getDocs(dataCollection).then(querySnapshot => {
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as { id: string; articles: string[]; questions: Question[] };
          return {
            id: doc.id,
            articles: data.articles,
            questions: data.questions,
          };
        });
      })
    );
  }


}
