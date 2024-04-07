import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  teacherInfo: Observable<any> | undefined;
  teacherName: string | undefined;
  teacherPassword: string | undefined;
  schoolName: string | undefined;
  constructor(private firestore: AngularFirestore) {}

  getTeacherInfo(): Observable<Teacher[]> {
    return this.firestore
      .collection('teachers')
      .doc('Súkromná stredná odborná škola, Dneperská 1') // need to change this for a variable that will determine which shcool to select from
      .collection('teacherInfo')
      .valueChanges()
      .pipe(
        map((teachers: any[]) => {
          return teachers.map((teacherData: any) => {
            return {
              schoolName: 'Súkromná stredná odborná škola, Dneperská 1', // need to change this for a variable that will determine which shcool to select from
              teacherName: teacherData.teacherName,
              teacherPassword: teacherData.teacherPassword,
            } as Teacher;
          });
        }),
      );
  }
}
