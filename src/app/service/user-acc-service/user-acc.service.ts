import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  public savedQuestionsSubject = new BehaviorSubject<Question[]>([]);
  savedQuestions$ = this.savedQuestionsSubject.asObservable();

  private localStorageKey = 'savedQuestions';

  constructor() {}

  selectedIcon!: string;

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

  getSavedTests(): Observable<SavedTest[]> {
    const userId = localStorage.getItem('uid');
    if (userId !== null) {
      return from(this.savedTestService.getSavedTests(userId));
    } else {
      return of([]);
    }
  }

  async sendData(file: File): Promise<void> {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      if (event && event.target) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        }) as any[][];
        this.uploadData(jsonData);
      } else {
        console.error('Event or event.target is null.');
      }
    };
  }
  private async uploadData(data: any[][]): Promise<void> {
    const batch = this.firestore.firestore.batch();
    const collectionRef = this.firestore.collection('highschoolDB');

    data.forEach((row) => {
      // Extract field2 value to be used as document ID
      const docId = row[1]; // Assuming field2 is at index 1 (0-indexed)
      if (!docId) {
        console.error('Skipping document without valid ID');
        return; // Skip this iteration if field2 is undefined or null
      }

      const docRef = collectionRef.doc(docId.toString()); // Convert to string if necessary
      const docData: { [key: string]: any } = {};

      // Extract fields 8, 9, and 10 from the row
      const fieldIndicesToExtract = [8, 9, 10];
      fieldIndicesToExtract.forEach((index, i) => {
        if (row[index] !== undefined) {
          docData[`field${i + 8}`] = row[index];
        }
      });

      batch.set(
        docRef.ref as DocumentReference<{
          field8: any;
          field9: any;
          field10: any;
        }>,
        docData,
      );
    });

    await batch.commit();
  }
}
