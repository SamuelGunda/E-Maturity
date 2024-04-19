import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { DashboardService } from 'src/app/service/dashboard-service/dashboard.service';
import { AuthService } from 'src/app/service/auth-serivce/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  teacherInfo$: Observable<Teacher[]> | undefined;
  schoolName: string | undefined;
  addWindow: boolean = false;
  teacherData = {
    teacherName: '',
    teacherPassword: '',
    email: '',
  };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {}

  openAddWindow() {
    this.addWindow = true;
  }
  closeWindow() {
    this.addWindow = false;
  }
  addNewTeacher() {
    this.dashboardService.addTeachersToDb(this.teacherData);
  }

  async ngOnInit(): Promise<void> {
    if (this.authService.getSchoolName()) {
      this.schoolName = this.authService.getSchoolName();
      const teacherInfoPromise = this.dashboardService.getTeacherInfo();
      this.teacherInfo$ = await teacherInfoPromise;
    }
  }
}
