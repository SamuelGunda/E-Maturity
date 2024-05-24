import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserStatistic } from 'src/app/model/user-statistics';
@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(private firestore: AngularFirestore) {}

  selectedIcon!: string;

  getTestStatistics(
    uid: string,
    subCat: string,
  ): Observable<{ averagePercentage: number; averageTime: string }> {
    const userStatisticsCollectionRef = this.firestore
      .collection('users')
      .doc(uid)
      .collection('userStatistics');
    const subjectCollectionRef = userStatisticsCollectionRef
      .doc('subjects')
      .collection(subCat);

    return from(subjectCollectionRef.get()).pipe(
      map((querySnapshot) => {
        const statistics: UserStatistic[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const userStatistic: UserStatistic = {
            percentageScore: data['percentageScore'],
            timeTaken: data['timeTaken'],
          };
          statistics.push(userStatistic);
        });

        const averagePercentage =
          this.calculateAveragePercentage(statistics);
        const averageTime = this.calculateAverageTime(statistics);

        return {
          averagePercentage: averagePercentage,
          averageTime: averageTime,
        };
      }),
    );
  }

  private calculateAveragePercentage(statistics: UserStatistic[]): number {
    if (statistics.length === 0) return 0;
    const totalPercentage = statistics.reduce(
      (sum, stat) => sum + stat.percentageScore,
      0,
    );
    const averagePercentage = totalPercentage / statistics.length;
    return parseFloat(averagePercentage.toFixed(2));
  }


  private calculateAverageTime(statistics: UserStatistic[]): string {
    if (statistics.length === 0) return '00:00';

    const totalSeconds = statistics.reduce(
      (sum, stat) => sum + this.timeStringToSeconds(stat.timeTaken),
      0,
    );
    const averageSeconds = totalSeconds / statistics.length;

    const averageMinutes = Math.floor(averageSeconds / 60);
    const averageSecondsRemainder = Math.floor(averageSeconds % 60);

    const averageTimeString = `${averageMinutes.toString().padStart(2, '0')}:${averageSecondsRemainder.toString().padStart(2, '0')}`;
    return averageTimeString;
  }

  timeStringToSeconds(time: string): number {
    const parts = time.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }

  getTestCountBySubject(uid: string, subCat: string): Observable<number> {
    const userStatisticsCollectionRef = this.firestore
      .collection('users')
      .doc(uid)
      .collection('userStatistics');
    const subjectCollectionRef = userStatisticsCollectionRef
      .doc('subjects')
      .collection(subCat);

    return from(subjectCollectionRef.get()).pipe(
      map((querySnapshot) => {
        return querySnapshot.size;
      }),
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
