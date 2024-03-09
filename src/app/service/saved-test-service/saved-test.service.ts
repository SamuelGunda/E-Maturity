import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { QuestionResult, SavedTest } from '../../model/saved-test.model';

@Injectable({
  providedIn: 'root',
})
export class SavedTestService {
  constructor(private firestore: Firestore) {}

  private convertFirestoreTimestampToJSDate(timestamp: any): Date {
    const { seconds, nanoseconds } = timestamp;
    return new Date(seconds * 1000 + nanoseconds / 1e6);
  }

  async getSavedTests(uid: string) {
    try {
      const savedTests: SavedTest[] = [];
      const userCollectionRef = collection(this.firestore, 'users');
      const documentByUidRef = doc(userCollectionRef, uid);
      const savedTestsCollectionRef = collection(
        documentByUidRef,
        'savedTests',
      );
      const querySnapshot = await getDocs(savedTestsCollectionRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dateFormat: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
        const savedTest: SavedTest = {
          id: data['id'],
          finishedAt: this.convertFirestoreTimestampToJSDate(
            data['finishedAt'],
          ),
          testName:
            data['testName'] +
            ' vypracovaný: ' +
            data['finishedAt'].toDate().toLocaleDateString('sk-SK', dateFormat),

          timeLeft: data['timeLeft'],
          questions: data['questions']
            .map((question: any) => {
              if (question.text === 'Zrušená otázka') {
                return null;
              } else {
                return {
                  questionId: question['questionId'],
                  image: question['image'],
                  text: question['text'],
                  correctAnswer: question['correctAnswer'],
                  userAnswer: question['userAnswer'],
                  isCorrect: question['isCorrect'],
                  options: question['options'],
                } as QuestionResult;
              }
            })
            .filter(
              (questionResult: QuestionResult | null) =>
                questionResult !== null,
            ),
        };
        savedTests.push(savedTest);
        console.log('Saved test:', savedTest);
      });
      const sortedTests = savedTests.sort(
        (a, b) => b.finishedAt.getTime() - a.finishedAt.getTime(),
      );
      if (sortedTests.length > 10) {
        this.removeOldestTest(uid);
      }
      return sortedTests;
    } catch (error) {
      console.error('Error getting saved tests:', error);
      throw error;
    }
  }

  async removeOldestTest(uid: string) {
    const userCollectionRef = collection(this.firestore, 'users');
    const documentByUidRef = doc(userCollectionRef, uid);
    const savedTestsCollectionRef = collection(documentByUidRef, 'savedTests');
    const querySnapshot = await getDocs(savedTestsCollectionRef);
    const allTests: any = [];
    querySnapshot.docs.forEach((doc) => {
      allTests.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    const sortedTests = allTests.sort(
      (a: any, b: any) => a.data.finishedAt.seconds - b.data.finishedAt.seconds,
    );
    console.log('All tests:', allTests);
    console.log('Sorted tests:', sortedTests);

    while (sortedTests.length > 10) {
      const oldestTest = sortedTests[0];
      console.log('Oldest test:', oldestTest);
      const id = oldestTest.id;
      console.log('Oldest test id:', id);
      await deleteDoc(doc(savedTestsCollectionRef, id));
      sortedTests.shift();
    }
  }
}
