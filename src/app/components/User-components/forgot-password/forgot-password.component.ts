import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  isError: boolean = false;
  errorMessage: string = 'Nesprávny formát emailu.';
  isDarkMode: boolean = false;

  constructor(private router: Router) {}

  isValidEmail(): void {
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    this.isError = !emailRegex.test(this.email);
  }

  sendPasswordResetEmail() {
    const auth = getAuth();
    this.isValidEmail();
    if (!this.isError) {
      try {
        sendPasswordResetEmail(auth, this.email);
        this.isError = false;
        this.router.navigate(['']);
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error sending password reset email: ${errorCode} - ${errorMessage}`,
        );
      }
    }
  }
}
