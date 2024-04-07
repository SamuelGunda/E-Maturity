import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { DashboardService } from 'src/app/service/dashboard-service/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  teacherInfo$: Observable<Teacher[]> | undefined;
  schoolName: string | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.teacherInfo$ = this.dashboardService.getTeacherInfo();
    this.setSchoolName();
  }

  setSchoolName(): void {
    this.teacherInfo$?.subscribe((teachers) => {
      if (teachers.length > 0) {
        this.schoolName = teachers[0].schoolName;
      }
    });
  }
}
