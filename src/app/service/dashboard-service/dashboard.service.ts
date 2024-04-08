import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { AuthService } from '../auth-serivce/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private firestore: AngularFirestore,
    private authSerivce: AuthService,
  ) {}

  /**
   * Funtion for getting teachers display on a dashboard, where when this function is called it firstly gets schoolName
   * from authService, after that the function looks into a database where its divided by schoolName and then it returns
   * all teachers
   * Rastislav Pačut
   */
  async getTeacherInfo(): Promise<Observable<Teacher[]>> {
    if (this.authSerivce.getSchoolName()) {
      const schoolName = this.authSerivce.getSchoolName();
      return this.firestore
        .collection('teachers')
        .doc(schoolName)
        .collection('teacherInfo')
        .valueChanges()
        .pipe(
          map((teachers: any[]) => {
            return teachers.map((teacherData: any) => {
              return {
                schoolName: schoolName,
                teacherName: teacherData.teacherName,
                teacherPassword: teacherData.teacherPassword,
              } as Teacher;
            });
          }),
        );
    } else {
      throw new Error('User not authenticated or schoolName not set');
    }
  }
}
