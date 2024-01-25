import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor() {}

  sendPasswordResetEmail() {
    const auth = getAuth();

    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        console.log('Password reset email sent successfully.');
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(
          `Error sending password reset email: ${errorCode} - ${errorMessage}`
        );
      });
  }
}
