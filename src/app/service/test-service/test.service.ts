import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, from, map, Observable } from 'rxjs';
import { Test } from '../../model/test.model';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Question } from '../../model/question.model';
import { Article } from '../../model/article.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private firestore: Firestore) {}

  getTestsYears(subCat: string): Observable<string[]> {
    const dataCollection = collection(this.firestore, 'test');

    return from(
      getDocs(dataCollection).then((querySnapshot) => {
        return querySnapshot.docs
          .filter((doc) => {
            const subject = doc.id.split('-')[1].toLowerCase();
            return subCat === subject;
          })
          .map((doc) => {
            const year = doc.id.split('-')[0];
            return year;
          });
      }),
    );
  }

  getTest(subCat: string, year: string): Observable<Test> {
    //Pristup ku kkolekcii test
    const dataCollection = collection(this.firestore, 'test');
    //Prijmanie subkategorie a roku, vytvori sa id ako v databaze
    const id = year + '-' + subCat.toUpperCase();
    //Referencia na dany dokument v kolekcii na zaklade id
    const documentRef = doc(dataCollection, id);
    //Pristup ku kolekcii articles
    const articlesCollectionRef = collection(documentRef, 'articles');
    //Pristup ku kolekcii questions
    const questionsCollectionRef = collection(documentRef, 'questions');

    //Forkjoin - funkcia ktora dokaze naraz vykonat funkcie
    //Potiahnutie troch kolekcii z firebase
    //Premena udajov na array(id, array articlov, array questions)
    return forkJoin([
      //1. funkcia
      from(
        getDoc(documentRef).then((snapshot) => {
          if (snapshot.exists()) {
            //v prvej funkcii returnes id
            return snapshot.id;
          } else {
            throw new Error('Document not found');
          }
        }),
      ),
      //2. funkcia
      from(
        getDocs(articlesCollectionRef).then((querySnapshot) => {
          //querySnapshot.docs - vsetky udaje z databazy, .map - prechadza datami z databazy
          const articles: Article[] = querySnapshot.docs.map((doc) => {
            //returnne jeden article a ulozi ho do arrayu articlov
            return {
              id: doc.id,
              url: doc.data()['url'],
            } as Article;
          });
          //return arrayu articlov
          return articles;
        }),
      ),
      //3.funkcia
      from(
        getDocs(questionsCollectionRef).then((querySnapshot) => {
          const questions: Question[] = querySnapshot.docs.map((doc) => {
            const options = doc.data()['options'];
            //returnne jednu question a ulozi ju do arrayu questions
            return {
              id: doc.id,
              correctAnswer: doc.data()['correctAnswer'],
              options: options,
              text: doc.data()['text'],
            } as Question;
          });
          //return arrayu questions
          return questions;
        }),
      ),
    ]).pipe(
      //Spojenie udajov do objektu test aj s returnom
      map(([testData, articlesData, questionsData]) => {
        const test: Test = {
          id: testData,
          articles: articlesData,
          questions: questionsData,
        };
        return test;
      }),
    );
  }
}
