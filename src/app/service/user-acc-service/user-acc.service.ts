import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, from, map, of, switchMap } from 'rxjs';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';
import { CollectionReference, DocumentData, Firestore, QuerySnapshot, collection, doc, getDocs } from 'firebase/firestore';
import { UserStatistic } from 'src/app/model/user-statistics';
@Injectable({
  providedIn: 'root',
})
export class UserAccountService {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  selectedIcon!: string;

  getTestStatistics(uid: string, subCat: string): Observable<{ averagePercentage: number, averageTime: string }> {
    const dataCollection = this.firestore.collection('users');
    const documentRef = dataCollection.doc(uid);
    const userStatisticsCollectionRef = documentRef.collection('userStatistics');
    const subjectDocumentRef = userStatisticsCollectionRef.doc('subjects');
    const subjectCollectionRef = subjectDocumentRef.collection(subCat);

    return from(subjectCollectionRef.get()).pipe(
      map((querySnapshot) => {
        const statistics: UserStatistic[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const userStatistic: UserStatistic = {
            percentageScore: data['percentageScore'],
            timeTaken: data['timeTaken']
          };
          statistics.push(userStatistic);
        });

        // Calculate average percentage and time
        const averagePercentage = this.calculateAveragePercentage(statistics);
        const averageTime = this.calculateAverageTime(statistics);

        return {
          averagePercentage: averagePercentage,
          averageTime: averageTime
        };
      })
    );
  }

  private calculateAveragePercentage(statistics: UserStatistic[]): number {
    if (statistics.length === 0) return 0;
    const totalPercentage = statistics.reduce((sum, stat) => sum + stat.percentageScore, 0);
    return totalPercentage / statistics.length;
  }

  private calculateAverageTime(statistics: UserStatistic[]): string {
    if (statistics.length === 0) return '00:00:00';
    const totalSeconds = statistics.reduce((sum, stat) => sum + this.timeStringToSeconds(stat.timeTaken), 0);
    const averageSeconds = totalSeconds / statistics.length;
    return this.secondsToTimeString(averageSeconds);
  }

  private timeStringToSeconds(time: string): number {
    const parts = time.split(':');
    return (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);
  }

  private secondsToTimeString(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':');
  }

  getTestCountBySubject(uid: string, subCat: string): Observable<number> {
    const userStatisticsCollectionRef = this.firestore.collection('users').doc(uid).collection('userStatistics');
    const subjectCollectionRef = userStatisticsCollectionRef.doc('subjects').collection(subCat);

    return from(subjectCollectionRef.get()).pipe(
      map((querySnapshot) => {
        return querySnapshot.size; // Vráti počet dokumentov v kolekcii
      })
    );
  }


  getAvailableIcons(): string[] {
    return [
      'assets/user_icons/boy.png',
      'assets/user_icons/girl.png',
      'assets/user_icons/default.png',
    ];
  }
  getSelectedIcon(): string {
    return this.selectedIcon || 'assets/user_icons/default.png';
  }
}