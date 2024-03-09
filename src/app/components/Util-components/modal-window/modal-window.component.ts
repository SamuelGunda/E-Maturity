import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../../test-components/test-page/test-page.component';
import { TestService } from '../../../service/test-service/test.service';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { DarkModeService } from '../../../service/dark-mode-serivce/dark-mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
})
export class ModalWindowComponent implements OnInit {
  authService: AuthService;
  isDarkMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private testService: TestService,
    authService: AuthService,
    private darkModeService: DarkModeService,
    private router: Router,
  ) {
    this.authService = authService;
  }
  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.onSave();
  }
  onClick(): void {
    this.dialogRef.close();
  }

  homepageRedirect(): void {
    window.scrollTo({
      top: 100,
      behavior: 'auto',
    });
    this.dialogRef.close();
  }
  onSave(): void {
    const uid = localStorage.getItem('uid');
    console.log(uid);
    console.log(this.data.savedTest);
    if (!uid) {
      console.error('User is not logged in');
      return;
    }
    this.testService.saveUserTest(uid, this.data.savedTest);
  }
}
