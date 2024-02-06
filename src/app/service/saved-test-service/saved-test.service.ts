import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
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
      return savedTests;
    } catch (error) {
      console.error('Error getting saved tests:', error);
      throw error;
    }
  }
}
